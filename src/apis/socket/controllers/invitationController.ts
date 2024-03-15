import user from "../../interfaces/userInterface";
import { getOneUser } from "../../services/userServices";
import { BaseController } from "./baseController";

export class InvitationController extends BaseController {
  sendInvitation = async ({ invitationSender, invitationReceiver }) => {
    try {
      const sender: user = await getOneUser(invitationSender)
      const reciever: user = await getOneUser(invitationReceiver)
      const data = {
        invitationSender: sender,
        invitationReceiver: reciever
      }
      this.socket.broadcast.emit("incoming-invitation", data)
    } catch (error) {
      console.log(error)
    }
  }
  acceptInvite = async ({ answerer, receiver }) => {
    try {
      const inviteAnswerer = await getOneUser(answerer)
      const AnswerReceiver = await getOneUser(receiver)
      const datas = {
        inviteAnswerer,
        AnswerReceiver
      }
      this.socket.broadcast.emit("accept-invite", datas)
    } catch (error) {
      console.log(error)
    }
  }

  rejectInvite = async ({ rejecter, receiver }) => {
    try {
      const inviteRejecter = await getOneUser(rejecter)
      const rejectReciever = await getOneUser(receiver)
      const data = {
        inviteRejecter,
        rejectReciever
      }
      this.socket.broadcast.emit("reject-invite", data)
    } catch (error) {
      console.log(error)
    }
  }
}