import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config({ path: './config.env' })
const validatePhoneNumber = (phoneNumber) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
  try {
    client.lookups.v1.phoneNumbers(phoneNumber).fetch()
    return true
  } catch (err) {
    return false
  }
}

export default validatePhoneNumber