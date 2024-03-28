import mongoose from "mongoose";
import validator from "validator"
import bcryptjs from "bcryptjs"
import user from "../interfaces/userInterface";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid Email']
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Phone Number is Required'],
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    select: false
  },
  image: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false
  },
  isOnline: {
    type: String,
    default: '0'
  },
  otp: { type: String, select: false },
  otpExpiredAt: { type: Date, select: false }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcryptjs.hash(this.password, 12)
  next()
})

userSchema.methods.comparePasswordinDb = async (password: string, passwordDB: string) => {
  return await bcryptjs.compare(password, passwordDB)
}

const User = mongoose.model<user>('User', userSchema)

export default User