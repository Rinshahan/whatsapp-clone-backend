import { ObjectId } from "mongoose"
import chat from "../interfaces/chatInterface"
import conversation from "../interfaces/conversationInterface"
import Conversation from "../schemas/conversationModel"
import Message from "../schemas/messageSchema"
import { customError } from "../utils/customError"


const send = async (sender: string, reciever: string, message: string): Promise<chat> => {
  try {
    // check is it exists
    if (!sender || !reciever || !message) {
      throw new customError("Missing required fields", 500)
    }
    // sender and reciever cannot be same
    if (sender === reciever) {
      throw new Error("Cannot send message to Yourself")
    }
    // find the conversation between sender and receiver 
    let conversation: conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] }
    })

    if (!conversation) { // if not in the db . create it
      conversation = await Conversation.create({
        participants: [sender, reciever]
      })
    }

    // also store messages in the db
    const newMessage = new Message({
      sender: sender,
      reciever: reciever,
      message: message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id as unknown as ObjectId)
    }

    Promise.all([conversation.save(), newMessage.save()]) // this will run in parellel
    return newMessage
  } catch (error) {
    throw new customError(error, 404)
  }
}

const get = async (userToChatID: string, senderId: string): Promise<conversation> => {
  // find the conversation and return it 
  const conversation: conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatID] }
  }).populate("messages")
  return conversation
}

export {
  send,
  get
}