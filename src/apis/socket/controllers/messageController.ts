
import conversation from "../../interfaces/conversationInterface";
import Conversation from "../../schemas/conversationModel";
import Message from "../../schemas/messageSchema";
import { BaseController } from "./baseController";

export class MessageController extends BaseController {
  sendMessage = async ({ sender, reciever, message }) => {
    let findConversation: conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] }
    })

    if (!findConversation) {
      Conversation.create({
        participants: [sender, reciever],
        messages: message
      })
    }


    const newMessage = await Message.create({
      sender: sender,
      reciever: reciever,
      message: message,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await newMessage.save()

    this.socket.to(reciever).emit("newMessage", newMessage)

  }


}