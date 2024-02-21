"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatServices_1 = require("../services/chatServices");
const sockets = (socket) => {
    console.log("New User Connected", socket.id);
    socket.on("sendMessage", (data) => {
        console.log(data);
        (0, chatServices_1.send)(data.sender, data.userToChatId, data.message);
        socket.emit("messageRecieved", data);
    });
};
exports.default = sockets;
