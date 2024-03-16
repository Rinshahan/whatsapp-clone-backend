"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const protectRoutes_1 = __importDefault(require("../middlewares/protectRoutes"));
const multer_1 = require("../middlewares/multer");
const userRoutes = express_1.default.Router();
userRoutes.route('/')
    .get(protectRoutes_1.default, userController_1.getAllTheUsers);
userRoutes.route('/:id')
    .get(protectRoutes_1.default, userController_1.getUser);
userRoutes.route('/:id')
    .patch(protectRoutes_1.default, multer_1.imageUpload, userController_1.updateUser);
exports.default = userRoutes;
