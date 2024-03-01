"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageController_1 = require("./controllers/messageController");
const roomController_1 = require("./controllers/roomController");
// Function to create unique room name for two users
const sockets = (socket, io) => {
    console.log("New User Connected", socket.id);
    const messageController = new messageController_1.MessageController(socket, io);
    const roomController = new roomController_1.RoomController(socket, io);
    socket.on("send-message", messageController.sendMessage);
    socket.on('join-room', roomController.joinRoom);
};
exports.default = sockets;
