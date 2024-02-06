import chat from "../interfaces/chatInterface"
import Message from "../schemas/messageSchema"
import { customError } from "../utils/customError"


const send = async (sender: string, reciever: string, message: string): Promise<chat> => {
  try {
    if (!sender || !reciever || !message) {
      throw new customError("Missing required fields", 500)
    }
    const sendMessage = new Message({
      sender: sender,
      reciever: reciever,
      message: message
    })
    await sendMessage.save()
    return sendMessage
  } catch (error) {
    throw new customError(error, 404)
  }
}

export {
  send
}