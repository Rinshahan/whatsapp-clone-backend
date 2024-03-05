
import { ObjectId } from "mongoose";
import Conversation from "../../schemas/conversationModel";
import Message from "../../schemas/messageSchema";
import { BaseController } from "./baseController";
import conversation from "../../interfaces/conversationInterface";
import { Server } from "socket.io";

export class MessageController extends BaseController {

  sendMessage = async ({ sender, reciever, message, room }) => {
    try {
      console.log(sender, reciever, message)

      let findConversation: conversation = await Conversation.findOne({
        participants: { $all: [sender, reciever] }
      })

      if (findConversation === null) {
        findConversation = await Conversation.create({
          participants: [sender, reciever],
          messages: []
        })
      }


      const newMessage = await Message.create({
        sender: sender,
        reciever: reciever,
        message: message,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      if (findConversation) {
        findConversation.messages.push(newMessage._id as unknown as ObjectId)
      }


      findConversation.save()
      await newMessage.save()


      // let skt = this.socket.broadcast
      // skt = room ? skt.to(room) : skt
      console.log(room)
      // this.socket.to(room).emit("new-message", newMessage)
      // this.socket.broadcast.emit("new-message", newMessage)
      this.io.to(room).emit("new-message", newMessage)

    } catch (err) {
      console.log('Error :', err)
    }


  }

}