import express from "express"
import { sendOtp } from "../controllers/userSignupController"

const userAuthRoutes = express.Router()

userAuthRoutes.route('/login')
  .post(sendOtp)

export default userAuthRoutes