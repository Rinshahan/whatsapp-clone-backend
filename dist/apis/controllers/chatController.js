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
exports.getMessages = exports.sendMessage = void 0;
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const chatServices_1 = require("../services/chatServices");
const customError_1 = require("../utils/customError");
const sendMessage = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.user._id; // when user login it will be in the jwt token
    const reciever = req.params.id; // in the params
    const message = req.body.message;
    const sendMsg = yield (0, chatServices_1.send)(sender, reciever, message); // pass as an argument to the method in the service folder
    if (sendMessage.length === 0) {
        res.status(404).json({
            status: 'failed',
            message: 'something went wrong'
        });
    }
    else {
        res.status(200).json({
            status: "success",
            message: sendMsg
        });
    }
}));
exports.sendMessage = sendMessage;
const getMessages = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userToChatId = req.params.id;
    const senderId = req.user._id;
    const getTheMessage = yield (0, chatServices_1.get)(userToChatId, senderId);
    if (getMessages.length === 0) {
        throw new customError_1.customError("Something went wrong", 404);
    }
    else {
        res.status(200).json({
            status: "success",
            data: getTheMessage.messages
        });
    }
}));
exports.getMessages = getMessages;
