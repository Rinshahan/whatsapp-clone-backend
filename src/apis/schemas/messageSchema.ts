import mongoose from "mongoose";
import chat from "../interfaces/chatInterface";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Message = mongoose.model<chat>('Message', messageSchema)

export default Message