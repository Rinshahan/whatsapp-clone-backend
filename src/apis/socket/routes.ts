import { Server, Socket } from "socket.io"

import { MessageController } from "./controllers/messageController"
import { RoomController } from "./controllers/roomController";
import { VideoCallController } from "./controllers/videoCallController";


// Function to create unique room name for two users



const sockets = (socket: Socket, io: Server) => {
  console.log("New User Connected", socket.id)
  const messageController = new MessageController(socket, io)
  const roomController = new RoomController(socket, io)
  const videoController = new VideoCallController(socket, io)
  socket.on("send-message", messageController.sendMessage)
  socket.on('join-room', roomController.joinRoom)
  socket.on("initiate-call", videoController.initiateCall)
  socket.on("answer-call", videoController.answerCall)
}

export default sockets