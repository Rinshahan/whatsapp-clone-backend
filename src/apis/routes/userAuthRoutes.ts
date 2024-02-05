import express from "express"
import { loginUser, signUpUser } from "../controllers/userAuthController"
import multer from "multer"


const userAuthRoutes = express.Router()

const upload = multer()


userAuthRoutes.route('/register')
  .post(upload.none(), signUpUser)
userAuthRoutes.route('/login')
  .get(loginUser)

export default userAuthRoutes