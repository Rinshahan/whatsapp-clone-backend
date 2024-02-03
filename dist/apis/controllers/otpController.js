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
exports.sendOtpPhone = void 0;
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const otpServices_1 = require("../services/otpServices");
const sendOtpPhone = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.phone;
    console.log(phoneNumber);
    const sendOtp = yield (0, otpServices_1.phoneOtp)(phoneNumber);
    if (sendOtp) {
        res.status(200).json({
            status: 'success',
            message: 'OTP Send successfully'
        });
    }
    else {
        res.status(500).json({
            status: 'failed',
            message: 'failed to send otp'
        });
    }
}));
exports.sendOtpPhone = sendOtpPhone;
const veryfyphoneOtp = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
