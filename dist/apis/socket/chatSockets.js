"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sockets = (socket) => {
    console.log("New User Connected", socket.id);
    socket.on("sendMessage", (data) => {
        console.log(data);
    });
};
exports.default = sockets;
