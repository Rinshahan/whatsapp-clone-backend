import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phoneNumber: String,
  otp: String,
  expiresAt: Date
})

otpSchema.index({ expiresAt: 1 })

const Otp = mongoose.model('otp', otpSchema)

mongoose.connection.on('connected', async () => {
  setInterval(async () => {
    try {
      await Otp.deleteMany({ expiresAt: { $lt: new Date() } }) //  delete expired otps
      console.log("expired otp deleted successfully")
    } catch (err) {
      console.log("error deleting in expired otps:", err)
    }
  }, 120000) // runs every 2 minutes
})

export default Otp