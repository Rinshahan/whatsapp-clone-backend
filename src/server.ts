import app from "./app";
import connectDB from "./config/dbConnection";
import dotenv from "dotenv"
import { Server } from "socket.io"
dotenv.config({ path: '../config.env' })
connectDB()

const port: Number = 3000

const server = app.listen(port, () => {
  console.log(`Listening to ${port}`)
})

const io = new Server(server)

io.on("connection", (socket) => {
  console.log("what is socket:", socket)

  socket.on("chat", (payload) => {
    console.log("what is payload:", payload)
    io.emit("chat", payload)
  })
})






