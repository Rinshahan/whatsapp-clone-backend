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
exports.changeCurrentPassword = exports.authenticateUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customError_1 = require("../utils/customError");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userSchema_1.default.create(user);
});
exports.createUser = createUser;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield userSchema_1.default.findOne({ email }).select('+password');
    if (!findUser || !(yield findUser.comparePasswordinDb(password, findUser.password))) {
        throw new Error("Incorrect email or password");
    }
    else {
        return findUser;
    }
});
exports.authenticateUser = authenticateUser;
const changeCurrentPassword = (userId, prevPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield userSchema_1.default.findById(userId).select('+password');
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
    try {
        if (findUser) {
            const matchPassword = yield findUser.comparePasswordinDb(prevPassword, findUser.password);
            if (matchPassword && newPassword.length > 0) {
                yield userSchema_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
                return true;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        throw new customError_1.customError(`Error Updating Password : ${error}`, 500);
    }
});
exports.changeCurrentPassword = changeCurrentPassword;
