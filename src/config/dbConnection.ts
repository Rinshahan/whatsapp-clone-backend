import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config({ path: './config.env' })

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.LOCAL_CONN_STR)
    console.log(`MongoDB Connected : ${connect.connection.host}`)
  }
  catch (err) {
    console.log(err);
  }
}

export default connectDB