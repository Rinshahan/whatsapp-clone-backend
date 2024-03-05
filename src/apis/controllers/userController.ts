import { Request, Response } from "express";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { getAllUsers, getOneUser } from "../services/userServices";
import { customError } from "../utils/customError";
import user from "../interfaces/userInterface";

const getAllTheUsers = asyncErrorHandler(async (req: Request, res: Response) => {
  const loggedInUserId: string = req.user._id
  const getUsers: user[] = await getAllUsers(loggedInUserId)
  if (getUsers.length === 0) {
    throw new customError("No Users Found", 404)
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        getUsers
      }
    })
  }
})


const getUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const userId: string = req.params.id
  const user: user = await getOneUser(userId)
  if (!user) {
    throw new customError("No User Found", 404)
  }
  res.status(200).json({
    status: 'success',
    data: user
  })
})


export {
  getAllTheUsers,
  getUser
}

