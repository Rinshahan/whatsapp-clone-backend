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
exports.MessageController = void 0;
const conversationModel_1 = __importDefault(require("../../schemas/conversationModel"));
const messageSchema_1 = __importDefault(require("../../schemas/messageSchema"));
const baseController_1 = require("./baseController");
class MessageController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.sendMessage = ({ sender, reciever, message, room }) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.socket.rooms);
                console.log(sender, reciever, message);
                let findConversation = yield conversationModel_1.default.findOne({
                    participants: { $all: [sender, reciever] }
                });
                if (findConversation === null) {
                    findConversation = yield conversationModel_1.default.create({
                        participants: [sender, reciever],
                        messages: []
                    });
                }
                const newMessage = yield messageSchema_1.default.create({
                    sender: sender,
                    reciever: reciever,
                    message: message,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                if (findConversation) {
                    findConversation.messages.push(newMessage._id);
                }
                findConversation.save();
                yield newMessage.save();
                // let skt = this.socket.broadcast
                // skt = room ? skt.to(room) : skt
                this.socket.to(room).emit("new-message", newMessage);
                // this.socket.broadcast.emit("new-message", newMessage)
            }
            catch (err) {
                console.log('Error :', err);
            }
        });
    }
}
exports.MessageController = MessageController;
