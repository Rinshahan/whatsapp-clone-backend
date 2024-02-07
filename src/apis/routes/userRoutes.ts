import express from "express"
import { getAllTheUsers } from "../controllers/userController"

const userRoutes = express.Router()

userRoutes.route('/')
  .get(getAllTheUsers)


export default userRoutes