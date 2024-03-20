import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { authenticateUser, changeCurrentPassword, createUser } from "../services/userAuthServices";
import generateToken from "../utils/jsonwebtoken";
import user from "../interfaces/userInterface";
import { customError } from "../utils/customError";

const signUpUser = asyncErrorHandler(async (req: Request, res: Response) => {
  console.log(req.body)
  const addUser: user = await createUser(req.body)
  res.status(200).json({
    status: "success",
    data: {
      addUser
    }
  })
})

const loginUser = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email
  const password = req.body.password
  // check email and password present in the body 
  if (!email && !password) {
    const error = new customError("Please provide username and password", 400)
    return next(error)
  }
  //authenticate function called here
  const authenticate = await authenticateUser(email, password)
  // token generation
  const token = generateToken(authenticate._id)
  res.status(200).json({
    status: "success",
    token: token,
    user: authenticate
  })
})

const userPasswordReset = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.params.id
  const previousPassword: string = req.body.prevPassword
  const newPassword: string = req.body.newPassword
  const changePassword = await changeCurrentPassword(userId, previousPassword, newPassword)
  if (changePassword) {
    res.status(200).json({
      status: 'success',
      message: 'Password Updated Successfully'
    })
  } else {
    res.status(500).json({
      status: "failed",
      message: 'Entered Password Dont match'
    })
  }
})

export { signUpUser, loginUser, userPasswordReset }