import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "./asyncErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../schemas/userSchema";

declare global {
  namespace Express {
    interface Request {
      user?;
    }
  }
}
const protect = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  //1. read token and check if exists
  const testToken: string = req.headers.authorization
  let token: string
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(' ')[1]
  }

  if (!token) {
    throw new Error("Yoo are not logged In")
  }
  //2.validate the token

  const decodedToken = await jwt.verify(token, process.env.SECRET_STR)
  //3. check the user exists
  const decodedPayload = decodedToken as JwtPayload
  const userId: string = decodedPayload.id

  const checkUser = await User.findById(userId)

  if (!checkUser) {
    throw new Error("User does not exists")
  }

  req.user = checkUser
  next()
})

export default protect