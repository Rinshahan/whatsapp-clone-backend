import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"
import bcryptjs from 'bcryptjs'
import { customError } from "../utils/customError"


const createUser = async (user: user): Promise<user> => {
  return await User.create(user)
}

const authenticateUser = async (email: string, password: string): Promise<user> => {
  const findUser = await User.findOne({ email }).select('+password')
  if (!findUser || !(await findUser.comparePasswordinDb(password, findUser.password))) {
    throw new Error("Incorrect email or password")
  } else {
    return findUser
  }
}

const changeCurrentPassword = async (userId: string, prevPassword: string, newPassword: string): Promise<boolean> => {
  const findUser = await User.findById(userId).select('+password')
  const hashedPassword = await bcryptjs.hash(newPassword, 12)
  try {
    if (findUser) {
      const matchPassword = await findUser.comparePasswordinDb(prevPassword, findUser.password)
      if (matchPassword && newPassword.length > 0) {
        await User.findByIdAndUpdate(userId, { password: hashedPassword })
        return true
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(error);
    throw new customError(`Error Updating Password : ${error}`, 500)
  }
}

export { createUser, authenticateUser, changeCurrentPassword }