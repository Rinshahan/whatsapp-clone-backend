// import { Socket } from "socket.io"
// import { sendMessage } from "../controllers/chatController"
// import { send } from "../services/chatServices"
// import { io } from "socket.io-client"


// const sockets = (socket: Socket) => {
//   console.log("New User Connected", socket.id)
//   socket.on("sendMessage", async (data) => {
//     try {
//       const newMessage = await send(data.sender, data.userToChatId, data.message)
//       // emit back to sender
//       socket.emit("newMessage", newMessage)
//       // emit message to reciever
//       const recieverSocket = io.server.sockets[data.userToChatId]
//       if (recieverSocket) {
//         recieverSocket.emit("newMessage", newMessage)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   })
// }

// export default 