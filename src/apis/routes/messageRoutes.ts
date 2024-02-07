import express from "express"
import { getMessages, sendMessage } from "../controllers/chatController"
import protect from "../middlewares/protectRoutes"
const messageRoutes = express.Router()

messageRoutes.route('/send/:id')
  .post(protect, sendMessage)

messageRoutes.route('/:id')
  .get(protect, getMessages)
export default messageRoutes