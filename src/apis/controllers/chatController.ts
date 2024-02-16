import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { get, send } from "../services/chatServices";
import chat from "../interfaces/chatInterface";
import { customError } from "../utils/customError";

const sendMessage = asyncErrorHandler(async (req: Request, res: Response) => {
  const sender: string = req.user._id // when user login it will be in the jwt token
  const reciever: string = req.params.id // in the params
  const message: string = req.body.message
  const sendMsg: chat = await send(sender, reciever, message) // pass as an argument to the method in the service folder
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

const getMessages = asyncErrorHandler(async (req: Request, res: Response) => {
  const userToChatId: string = req.params.id
  const senderId: string = req.user._id
  const getTheMessage = await get(userToChatId, senderId)
  if (getMessages.length === 0) {
    throw new customError("Something went wrong", 404)
  } else {
    res.status(200).json({
      status: "success",
      message: getTheMessage.messages
    })
  }
})

export {
  sendMessage,
  getMessages
}