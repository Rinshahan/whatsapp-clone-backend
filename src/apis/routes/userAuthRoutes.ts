import express from "express"
import { loginUser, signUpUser } from "../controllers/userAuthController"
import multer from "multer"
import { imageUpload } from "../middlewares/multer"


const userAuthRoutes = express.Router()

userAuthRoutes.route('/register')
  .post(imageUpload, signUpUser)
userAuthRoutes.route('/login')
  .post(loginUser)

export default userAuthRoutes