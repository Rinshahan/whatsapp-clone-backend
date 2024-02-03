import express from "express"
import { sendOtpPhone } from "../controllers/otpController"

const userAuthRoutes = express.Router()

userAuthRoutes.route('/login')
  .post(sendOtpPhone)

export default userAuthRoutes