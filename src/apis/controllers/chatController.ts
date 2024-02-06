import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { send } from "../services/chatServices";
import chat from "../interfaces/chatInterface";

const sendMessage = asyncErrorHandler(async (req: Request, res: Response) => {
  const sender: string = req.params.id
  const reciever: string = req.body.reciever
  const message: string = req.body.message

  const sendMsg: chat = await send(sender, reciever, message)
  if (sendMessage.length === 0) {
    res.status(404).json({
      status: 'failed',
      message: 'something went wrong'
    })
  } else {
    res.status(200).json({
      status: "success",
      message: sendMsg
    })
  }
})

export {
  sendMessage
}