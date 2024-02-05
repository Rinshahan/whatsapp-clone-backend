import express from "express"
import { sendOtpPhone, veryfyphoneOtp } from "../controllers/otpController"

const otpRoutes = express.Router()

otpRoutes.route('/sendOtp')
  .post(sendOtpPhone)
  .post(veryfyphoneOtp)

export default otpRoutes

