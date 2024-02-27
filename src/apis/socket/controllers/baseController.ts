import { Socket } from "socket.io";

export class BaseController {
  socket: Socket
  constructor(socket: Socket) {
    this.socket = socket
  }
}