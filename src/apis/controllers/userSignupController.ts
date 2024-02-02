import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import dotenv from "dotenv"
import twilio from "twilio"

dotenv.config({ path: './config.env' })

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

const sendOtp = asyncErrorHandler(async (req: Request, res: Response) => {
  const phoneNumber: string = req.body.phone
  if (phoneNumber.length === 10) {

  }

  res.status(200).json({
    status: 'success',
    message: 'OTP Send successfully'
  })
})

export {
  sendOtp
}