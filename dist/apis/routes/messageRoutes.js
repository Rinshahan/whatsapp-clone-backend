"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const messageRoutes = express_1.default.Router();
messageRoutes.route('/send/:id')
    .post(chatController_1.sendMessage);
exports.default = messageRoutes;
