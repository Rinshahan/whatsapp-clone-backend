import { getOneUser } from "../../services/userServices";
import { BaseController } from "./baseController";

export class VideoCallController extends BaseController {
  initiateCall = async ({ offer, roomId, caller, reciever }) => {
    const callerData = await getOneUser(caller)
    const recieverData = await getOneUser(reciever)
    const data = {
      offer: offer,
      roomId: roomId,
      caller: callerData,
      reciever: recieverData
    }
    this.socket.broadcast.emit("incoming-call", data)
  }

  answerCall = async ({ }) => {

  }
} 