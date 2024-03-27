import dotenv from "dotenv"
import twilio, { Twilio } from "twilio"
import validatePhoneNumber from "../utils/phoneValidation"
import generateOtp from "../utils/generateOtp"
import User from "../schemas/userSchema"
import user from "../interfaces/userInterface"
import { customError } from "../utils/customError"

dotenv.config({ path: '../config.env' })

const client: Twilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const phoneOtp = async (phoneNumber: string): Promise<boolean> => {
  try {
    if (!validatePhoneNumber(phoneNumber)) { // validating phone number
      return false
    } else {
      const otp = generateOtp() // generate otp
      //find user and  store otp in db with expiration
      const findUser: user = await User.findOne({ phone: phoneNumber })
      if (!findUser) {
        throw new customError("Can'nt find Registered Phone Number", 404)
      }
      const updatedUser = await User.findByIdAndUpdate(findUser._id, {
        otp: otp,
        otpExpiredAt: new Date(Date.now() + 120000)
      })
      // send otp using twilio
      await client.messages.create({ // this block is sending messages
        body: `${otp} is your OTP to login - this OTP will expires in 2 minutes`,
        from: '+16592175539',
        to: phoneNumber
      })
      return true
    }
  } catch (err) {
    throw new customError(err, 404)
  }
}

const verify = async (otp: string): Promise<user> => {
  const findOtp: user = await User.findOne({ otp })
  if (!findOtp && findOtp.otpExpiredAt < new Date()) {
    new customError("OTP has been expired! Please try again!", 400)
  } else {
    await User.findByIdAndUpdate(findOtp._id, { otp: null, otpExpiredAt: null })
    return findOtp
  }
}

export { phoneOtp, verify }