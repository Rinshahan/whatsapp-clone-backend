import express from "express"
import { getAllTheUsers, getUser } from "../controllers/userController"
import protect from "../middlewares/protectRoutes"

const userRoutes = express.Router()

userRoutes.route('/')
  .get(protect, getAllTheUsers)

userRoutes.route('/:id')
  .get(protect, getUser)
export default userRoutes