import app from "./app";
import connectDB from "./config/dbConnection";
import dotenv from "dotenv"

dotenv.config({ path: '../config.env' })

const port: Number = 3000

connectDB()


app.listen(port, () => {
  console.log(`Listening to ${port}`)
})