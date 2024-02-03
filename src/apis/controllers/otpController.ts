import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";

import { phoneOtp } from "../services/otpServices";


const sendOtpPhone = asyncErrorHandler(async (req: Request, res: Response) => {
  const phoneNumber: string = req.body.phone
  console.log(phoneNumber)
  const sendOtp = await phoneOtp(phoneNumber)
  if (sendOtp) {
    res.status(200).json({
      status: 'success',
      message: 'OTP Send successfully'
    })
  }
  else {
    res.status(500).json({
      status: 'failed',
      message: 'failed to send otp'
    })
  }
})

const veryfyphoneOtp = asyncErrorHandler(async (req: Request, res: Response) => { })

export {
  sendOtpPhone
}