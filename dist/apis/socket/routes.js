"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageController_1 = require("./controllers/messageController");
const roomController_1 = require("./controllers/roomController");
// Function to create unique room name for two users
function getRoomName(userId1, userId2) {
    return userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;
}
const sockets = (socket) => {
    console.log("New User Connected", socket.id);
    const messageController = new messageController_1.MessageController(socket);
    const roomController = new roomController_1.RoomController(socket);
    socket.on("send-message", messageController.sendMessage);
    socket.on('join-room', roomController.joinRoom);
};
exports.default = sockets;
