import express from "express"
import { sendOtpPhone, veryfyphoneOtp } from "../controllers/otpController"

const otpRoutes = express.Router()
otpRoutes.route('/sendOtp')
  .post(sendOtpPhone)

otpRoutes.route('/verifyOtp')
  .post(veryfyphoneOtp)

export default otpRoutes

