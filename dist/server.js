"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const chatSockets_1 = __importDefault(require("./apis/socket/chatSockets"));
dotenv_1.default.config({ path: '../config.env' });
(0, dbConnection_1.default)();
const httpServer = http_1.default.createServer(app_1.default);
const port = 3000;
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200"]
    }
});
io.on("connection", chatSockets_1.default);
httpServer.listen(port, () => {
    console.log(`Listening to ${port}`);
});
