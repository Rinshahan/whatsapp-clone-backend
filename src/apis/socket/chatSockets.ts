import { Socket } from "socket.io"

const sockets = (socket: Socket) => {
  console.log("New User Connected", socket.id)

  socket.on("sendMessage", (data) => {
    console.log(data);
  })
}

export default sockets