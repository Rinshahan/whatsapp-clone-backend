import express from "express"
import { deleteUser, getAllTheUsers, getUser, updateUser } from "../controllers/userController"
import protect from "../middlewares/protectRoutes"
import { imageUpload } from "../middlewares/multer"

const userRoutes = express.Router()

userRoutes.route('/')
  .get(protect, getAllTheUsers)

userRoutes.route('/:id')
  .get(protect, getUser)

userRoutes.route('/:id')
  .patch(protect, imageUpload, updateUser)

userRoutes.route('/:id')
  .delete(protect, deleteUser)

export default userRoutes