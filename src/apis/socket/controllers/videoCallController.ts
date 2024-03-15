import { getOneUser } from "../../services/userServices";
import { BaseController } from "./baseController";

export class VideoCallController extends BaseController {
  initiateCall = async ({ offer, roomId, caller, reciever }) => {
    console.log(roomId)
    const callerData = await getOneUser(caller)
    const recieverData = await getOneUser(reciever)
    const data = {
      offer: offer,
      roomId: roomId,
      caller: callerData,
      reciever: recieverData
    }
    //this.socket.broadcast.emit("incoming-call", data)
    this.socket.to(roomId).emit("incoming-call", data)
  }

  answerCall = async ({ roomId, answerer, reciever, answer }) => {
    console.log(roomId)
    const answeredUser = await getOneUser(answerer)
    const recievedUser = await getOneUser(reciever)
    const data = {
      answerer: answeredUser,
      recievedUser: recievedUser,
      answer: answer
    }
    //this.socket.broadcast.emit("answer-made", data)
    this.socket.to(roomId).emit("answer-made", data)
  }

  iceCandidate = async ({ roomId, sender, reciever, candidate }) => {
    console.log(roomId);

    const sendedUser = await getOneUser(sender)
    const receievedUser = await getOneUser(reciever)
    const data = {
      sender: sendedUser,
      reciever: receievedUser,
      candidate: candidate
    }
    //this.socket.broadcast.emit("ice-candidate", data)
    this.socket.to(roomId).emit("ice-candidate", data)
  }

} 