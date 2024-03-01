import { BaseController } from "./baseController";

export class RoomController extends BaseController {
  joinRoom = async (roomId: string) => {
    console.log(roomId)
    this.socket.join(roomId)
  }
} 