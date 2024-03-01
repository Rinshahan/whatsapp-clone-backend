import { Server, Socket } from "socket.io"

import { MessageController } from "./controllers/messageController"
import { RoomController } from "./controllers/roomController";


// Function to create unique room name for two users



const sockets = (socket: Socket, io: Server) => {
  console.log("New User Connected", socket.id)
  const messageController = new MessageController(socket, io)
  const roomController = new RoomController(socket, io)
  socket.on("send-message", messageController.sendMessage)
  socket.on('join-room', roomController.joinRoom)
}

export default sockets