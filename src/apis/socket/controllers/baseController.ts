import { Socket } from "socket.io";

export class BaseController {
  socket: Socket
  constructor(socket) {
    this.socket = socket
  }
}