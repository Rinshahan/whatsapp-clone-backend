import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"

const getAllUsers = async (loggedUserId): Promise<user[]> => {
  const users = await User.find({ _id: { $ne: loggedUserId } })
  return users
}

export {
  getAllUsers
}