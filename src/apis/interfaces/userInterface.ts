interface user {
  _id?: string,
  username: string,
  email: string,
  phone: string,
  password: string,
  profilepic: string,
  accountCreatedDate: Date,
  isDeleted: boolean,
  otp: string,
  otpExpiredAt: Date
  comparePasswordinDb(password: string, passwordDB: string)
}

export default user
