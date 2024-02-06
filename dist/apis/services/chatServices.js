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
exports.send = void 0;
const messageSchema_1 = __importDefault(require("../schemas/messageSchema"));
const customError_1 = require("../utils/customError");
const send = (sender, reciever, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!sender || !reciever || !message) {
            throw new customError_1.customError("Missing required fields", 500);
        }
        const sendMessage = new messageSchema_1.default({
            sender: sender,
            reciever: reciever,
            message: message
        });
        yield sendMessage.save();
        return sendMessage;
    }
    catch (error) {
        throw new customError_1.customError(error, 404);
    }
});
exports.send = send;
