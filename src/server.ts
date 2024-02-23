import { Server } from "socket.io";
import app from "./app";
import connectDB from "./config/dbConnection";
import dotenv from "dotenv"
import http from 'http'

import { send } from "./apis/services/chatServices";
dotenv.config({ path: '../config.env' })
connectDB()

const httpServer = http.createServer(app)
const port: Number = 3000

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4200"]
  }
})


io.on("connection", (socket) => {
  console.log('new User Connected', socket.id)
  socket.on("sendMessage", async (data) => {
    try {
      // this send method saves the datas in the db and return 
      const newMessage = await send(data.sender, data.userToChatId, data.message)
      // emit back to the client
      io.emit("newMessage", newMessage)
    } catch (err) {
      console.log(err)
    }
  })
})


httpServer.listen(port, () => {
  console.log(`Listening to ${port}`)
})
