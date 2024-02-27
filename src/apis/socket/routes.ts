import { Socket } from "socket.io"
import { get, send } from "../services/chatServices"
import { MessageController } from "./controllers/messageController"
import { RoomController } from "./controllers/roomController";

// Function to create unique room name for two users
function getRoomName(userId1, userId2) {
  return userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;
}


const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)
  const messageController = new MessageController(socket)
  const roomController = new RoomController(socket)
  socket.on("send-message", messageController.sendMessage)
  socket.on('join-room', roomController.joinRoom)

}

export default sockets