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
        this.sendMessage = ({ sender, reciever, message }) => __awaiter(this, void 0, void 0, function* () {
            let findConversation = yield conversationModel_1.default.findOne({
                participants: { $all: [sender, reciever] }
            });
            if (!findConversation) {
                conversationModel_1.default.create({
                    participants: [sender, reciever],
                    messages: message
                });
            }
            const newMessage = yield messageSchema_1.default.create({
                sender: sender,
                reciever: reciever,
                message: message,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            yield newMessage.save();
            this.socket.to(reciever).emit("newMessage", newMessage);
        });
    }
}
exports.MessageController = MessageController;
