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
exports.updatedUser = exports.getOneUser = exports.getAllUsers = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const getAllUsers = (loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userSchema_1.default.find({ _id: { $ne: loggedUserId } });
    return users;
});
exports.getAllUsers = getAllUsers;
const getOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userSchema_1.default.findById(userId);
    return users;
});
exports.getOneUser = getOneUser;
const updatedUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUserById = yield userSchema_1.default.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUserById;
});
exports.updatedUser = updatedUser;
