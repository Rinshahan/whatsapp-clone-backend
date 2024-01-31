"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSignupController_1 = require("../controllers/userSignupController");
const userAuthRoutes = express_1.default.Router();
userAuthRoutes.route('/login')
    .post(userSignupController_1.createUser);
exports.default = userAuthRoutes;
