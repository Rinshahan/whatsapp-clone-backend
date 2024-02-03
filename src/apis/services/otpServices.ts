import dotenv from "dotenv"
import twilio, { Twilio } from "twilio"
import validatePhoneNumber from "../utils/phoneValidation"
import generateOtp from "../utils/generateOtp"
import Otp from "../schemas/otpSchema"
dotenv.config({ path: './config.env' })

const client: Twilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const phoneOtp = async (phoneNumber: string): Promise<boolean> => {
  try {
    if (!validatePhoneNumber(phoneNumber)) { // validating phone number
      return false
    } else {
      const otp = generateOtp() // generate otp
      // store otp in db with expiration
      const otpData = new Otp({
        phoneNumber,
        otp,
        expiresAt: new Date
      })
      await otpData.save()
      // send otp using twilio
      await client.messages.create({ // this block is sending messages
        body: `${otp} is your OTP to login - this OTP will expires in 2 minutes`,
        from: '+16592175539',
        to: phoneNumber
      })
      return true
    }
  } catch (err) {
    console.log(err);

    return false
  }
}

export { phoneOtp }