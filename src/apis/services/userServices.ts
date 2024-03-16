import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"

const getAllUsers = async (loggedUserId): Promise<user[]> => {
  const users = await User.find({ _id: { $ne: loggedUserId } })
  return users
}

const getOneUser = async (userId: string): Promise<user> => {
  const users = await User.findById(userId)
  return users
}

const updatedUser = async (userId: string, userData): Promise<user> => {
  const updatedUserById = await User.findByIdAndUpdate(userId, userData, { new: true })
  return updatedUserById
}

export {
  getAllUsers,
  getOneUser,
  updatedUser
}