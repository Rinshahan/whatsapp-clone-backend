"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const multer_1 = __importDefault(require("multer"));
const userAuthRoutes = express_1.default.Router();
const upload = (0, multer_1.default)();
userAuthRoutes.route('/register')
    .post(upload.none(), userAuthController_1.signUpUser);
userAuthRoutes.route('/login')
    .get(userAuthController_1.loginUser);
exports.default = userAuthRoutes;
