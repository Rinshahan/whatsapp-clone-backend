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
exports.userPasswordReset = exports.loginUser = exports.signUpUser = void 0;
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const userAuthServices_1 = require("../services/userAuthServices");
const jsonwebtoken_1 = __importDefault(require("../utils/jsonwebtoken"));
const customError_1 = require("../utils/customError");
const signUpUser = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const addUser = yield (0, userAuthServices_1.createUser)(req.body);
    res.status(200).json({
        status: "success",
        data: {
            addUser
        }
    });
}));
exports.signUpUser = signUpUser;
const loginUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    // check email and password present in the body 
    if (!email && !password) {
        const error = new customError_1.customError("Please provide username and password", 400);
        return next(error);
    }
    //authenticate function called here
    const authenticate = yield (0, userAuthServices_1.authenticateUser)(email, password);
    // token generation
    const token = (0, jsonwebtoken_1.default)(authenticate._id);
    res.status(200).json({
        status: "success",
        token: token,
        user: authenticate
    });
}));
exports.loginUser = loginUser;
const userPasswordReset = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const previousPassword = req.body.prevPassword;
    const newPassword = req.body.newPassword;
    const changePassword = yield (0, userAuthServices_1.changeCurrentPassword)(userId, previousPassword, newPassword);
    if (changePassword) {
        res.status(200).json({
            status: 'success',
            message: 'Password Updated Successfully'
        });
    }
    else {
        res.status(500).json({
            status: "failed",
            message: 'Entered Password Dont match'
        });
    }
}));
exports.userPasswordReset = userPasswordReset;
