import { BaseController } from "./baseController";

export class RoomController extends BaseController {
  joinRoom = async (roomId: string) => {
    this.socket.join(roomId)
  }
} 