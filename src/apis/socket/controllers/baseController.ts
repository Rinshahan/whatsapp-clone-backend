import { Server, Socket } from "socket.io";

export class BaseController {
  socket: Socket
  io: Server
  constructor(socket: Socket, io: Server) {
    this.socket = socket
    this.io = io
  }
}