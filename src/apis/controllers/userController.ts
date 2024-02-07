import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { getAllUsers } from "../services/userController";

const getAllTheUsers = asyncErrorHandler(async (req: Request, res: Response) => {
  const getUsers = await getAllUsers()
})