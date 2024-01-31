import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";

const createUser = asyncErrorHandler(async (req: Request, res: Response) => {

})

export {
  createUser
}