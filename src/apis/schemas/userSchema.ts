import mongoose from "mongoose";
import validator from "validator"
import bcryptjs from "bcryptjs"
import user from "../interfaces/userInterface";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid Email']
  },
  phone: {
    type: String,
    required: [true, 'Phone Number is Required']
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false
  },
  profilepic: {
    type: String,
    required: false
  },
  accountCreatedDate: {
    type: Date,
    default: new Date().toDateString()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

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