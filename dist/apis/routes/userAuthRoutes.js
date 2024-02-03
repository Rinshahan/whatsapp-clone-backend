"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpController_1 = require("../controllers/otpController");
const userAuthRoutes = express_1.default.Router();
userAuthRoutes.route('/login')
    .post(otpController_1.sendOtpPhone);
exports.default = userAuthRoutes;
