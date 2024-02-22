"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatServices_1 = require("../services/chatServices");
const socket_io_client_1 = require("socket.io-client");
const sockets = (socket) => {
    console.log("New User Connected", socket.id);
    socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = yield (0, chatServices_1.send)(data.sender, data.userToChatId, data.message);
            // emit back to sender
            socket.emit("newMessage", newMessage);
            // emit message to reciever
            const recieverSocket = socket_io_client_1.io.sockets.sockets[data.userToChatId];
            if (recieverSocket) {
                recieverSocket.emit("newMessage", newMessage);
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.default = sockets;
