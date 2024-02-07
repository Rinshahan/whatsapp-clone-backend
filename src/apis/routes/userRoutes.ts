import express from "express"
import { getAllTheUsers } from "../controllers/userController"
import protect from "../middlewares/protectRoutes"

const userRoutes = express.Router()

userRoutes.route('/')
  .get(protect, getAllTheUsers)


export default userRoutes