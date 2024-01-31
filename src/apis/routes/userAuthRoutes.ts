import express from "express"
import { createUser } from "../controllers/userSignupController"

const userAuthRoutes = express.Router()

userAuthRoutes.route('/login')
  .post(createUser)

export default userAuthRoutes