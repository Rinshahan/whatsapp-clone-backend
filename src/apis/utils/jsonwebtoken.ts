import jwt from "jsonwebtoken"

const generateToken = ((id: string) => {
  return jwt.sign({ id }, `${process.env.SECRET_STR}`, { expiresIn: 60 * 60 * 24 })
})

export default generateToken