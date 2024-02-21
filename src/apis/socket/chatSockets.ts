import { Socket } from "socket.io"
import { sendMessage } from "../controllers/chatController"
import { send } from "../services/chatServices"


const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)

  socket.on("sendMessage", (data) => {
    console.log(data)
    send(data.sender, data.userToChatId, data.message)
    socket.emit("messageRecieved", data)
  })
}

export default sockets