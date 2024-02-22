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
exports.get = exports.send = void 0;
const conversationModel_1 = __importDefault(require("../schemas/conversationModel"));
const messageSchema_1 = __importDefault(require("../schemas/messageSchema"));
const customError_1 = require("../utils/customError");
const send = (sender, reciever, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check is it exists
        if (!sender || !reciever || !message) {
            throw new customError_1.customError("Missing required fields", 500);
        }
        // sender and reciever cannot be same
        if (sender === reciever) {
            throw new Error("Cannot send message to Yourself");
        }
        // find the conversation between sender and receiver 
        let conversation = yield conversationModel_1.default.findOne({
            participants: { $all: [sender, reciever] }
        });
        if (!conversation) { // if not in the db . create it
            conversation = yield conversationModel_1.default.create({
                participants: [sender, reciever]
            });
        }
        // also store messages in the db
        const newMessage = new messageSchema_1.default({
            sender: sender,
            reciever: reciever,
            message: message,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        Promise.all([conversation.save(), newMessage.save()]); // this will run in parellel
        return newMessage;
    }
    catch (error) {
        console.log(error);
        throw new customError_1.customError(error, 404);
    }
});
exports.send = send;
const get = (userToChatID, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    // find the conversation and return it 
    const conversation = yield conversationModel_1.default.findOne({
        participants: { $all: [senderId, userToChatID] }
    }).populate("messages");
    return conversation;
});
exports.get = get;
