import { Request, Response } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";

const createUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const reqbody = req.body
  console.log(reqbody);
})

export {
  createUser
}