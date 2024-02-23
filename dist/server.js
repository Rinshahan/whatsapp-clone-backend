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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const chatServices_1 = require("./apis/services/chatServices");
dotenv_1.default.config({ path: '../config.env' });
(0, dbConnection_1.default)();
const httpServer = http_1.default.createServer(app_1.default);
const port = 3000;
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200"]
    }
});
io.on("connection", (socket) => {
    console.log('new User Connected', socket.id);
    socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // this send method saves the datas in the db and return 
            const newMessage = yield (0, chatServices_1.send)(data.sender, data.userToChatId, data.message);
            // emit back to the client
            io.emit("newMessage", newMessage);
        }
        catch (err) {
            console.log(err);
        }
    }));
});
httpServer.listen(port, () => {
    console.log(`Listening to ${port}`);
});
