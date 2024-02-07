import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"

const getAllUsers = async () => {
  const users = await User.find()
  return users
}

export {
  getAllUsers
}