import { BaseController } from "./baseController";

export class VideoCallController extends BaseController {
  initiateCall = async ({ offer, roomId }) => {
    this.io.to(roomId).emit("incoming-call", offer)
  }
}