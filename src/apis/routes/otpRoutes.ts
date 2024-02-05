import express from "express"
import { sendOtpPhone, veryfyphoneOtp } from "../controllers/otpController"

const otpRoutes = express.Router()

otpRoutes.route('/sendOtp')
  .post(sendOtpPhone)
  .get(veryfyphoneOtp)

export default otpRoutes

