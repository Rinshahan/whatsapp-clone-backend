import { Socket } from "socket.io"
import { get, send } from "../services/chatServices"


const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)
  // loads previous message

  socket.on("initialMessages", async (data) => {
    try {
      const getMessages = await get(data.userToChatId, data.sender)
      socket.emit("previousMessages", getMessages)
    } catch (error) {
      console.log(error)
    }
  })

  // send messages event
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await send(data.sender, data.userToChatId, data.message)
      // emit back to sender
      socket.broadcast.emit("newMessage", newMessage)
      // emit message to reciever

    } catch (err) {
      console.log(err)
    }
  })
}

export default sockets