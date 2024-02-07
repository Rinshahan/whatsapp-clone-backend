import mongoose from "mongoose";
import conversation from "../interfaces/conversationInterface";

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: []
    }
  ]
}, { timestamps: true })

const Conversation = mongoose.model<conversation>('Conversation', conversationSchema)

export default Conversation