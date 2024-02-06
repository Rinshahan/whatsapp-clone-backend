import express from "express"
import { sendMessage } from "../controllers/chatController"
const messageRoutes = express.Router()

messageRoutes.route('/send/:id')
  .post(sendMessage)

export default messageRoutes