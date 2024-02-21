import { Socket } from "socket.io"
import { sendMessage } from "../controllers/chatController"
import { send } from "../services/chatServices"


const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await send(data.sender, data.userToChatId, data.message)
      socket.emit("newMessage", newMessage)
    } catch (err) {
      console.log(err)
    }
  })
}

export default sockets