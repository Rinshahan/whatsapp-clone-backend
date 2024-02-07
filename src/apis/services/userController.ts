import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"

const getAllUsers = async (): Promise<user> => {
  const users: user = await User.find()
  return users
}

export {
  getAllUsers
}