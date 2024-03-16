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
exports.updateUser = exports.getUser = exports.getAllTheUsers = void 0;
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const userServices_1 = require("../services/userServices");
const customError_1 = require("../utils/customError");
const getAllTheUsers = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUserId = req.user._id;
    const getUsers = yield (0, userServices_1.getAllUsers)(loggedInUserId);
    if (getUsers.length === 0) {
        throw new customError_1.customError("No Users Found", 404);
    }
    else {
        res.status(200).json({
            status: 'success',
            data: {
                getUsers
            }
        });
    }
}));
exports.getAllTheUsers = getAllTheUsers;
const getUser = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield (0, userServices_1.getOneUser)(userId);
    if (!user) {
        throw new customError_1.customError("No User Found", 404);
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
}));
exports.getUser = getUser;
const updateUser = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const getUpdatedUser = yield (0, userServices_1.updatedUser)(userId, req.body);
    res.status(200).json({
        status: 'success',
        data: getUpdatedUser
    });
}));
exports.updateUser = updateUser;
