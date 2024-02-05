import user from "../interfaces/userInterface"
import User from "../schemas/userSchema"

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

export { createUser, authenticateUser }