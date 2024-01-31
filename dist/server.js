"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config({ path: '../config.env' });
(0, dbConnection_1.default)();
const port = 3000;
const server = app_1.default.listen(port, () => {
    console.log(`Listening to ${port}`);
});
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("what is socket:", socket);
    socket.on("chat", (payload) => {
        console.log("what is payload:", payload);
        io.emit("chat", payload);
    });
});
