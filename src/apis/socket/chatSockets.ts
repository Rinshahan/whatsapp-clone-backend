import { Socket } from "socket.io"
import { sendMessage } from "../controllers/chatController"
import { send } from "../services/chatServices"


const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)

  socket.on("sendMessage", async (data) => {
    console.log(data)
    const newMessage = await send(data.sender, data.userToChatId, data.message)
    socket.emit("messageRecieved", newMessage)
  })
}

export default sockets