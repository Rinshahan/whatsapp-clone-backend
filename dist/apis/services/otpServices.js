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
exports.verify = exports.phoneOtp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
const phoneValidation_1 = __importDefault(require("../utils/phoneValidation"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const customError_1 = require("../utils/customError");
dotenv_1.default.config({ path: './config.env' });
const client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const phoneOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, phoneValidation_1.default)(phoneNumber)) { // validating phone number
            return false;
        }
        else {
            const otp = (0, generateOtp_1.default)(); // generate otp
            //find user and  store otp in db with expiration
            const findUser = yield userSchema_1.default.findOne({ phone: phoneNumber });
            if (!findUser) {
                throw new customError_1.customError("User not found please Register", 404);
            }
            const updatedUser = yield userSchema_1.default.findByIdAndUpdate(findUser._id, {
                otp: otp,
                otpExpiredAt: new Date(Date.now() + 120000)
            });
            // send otp using twilio
            yield client.messages.create({
                body: `${otp} is your OTP to login - this OTP will expires in 2 minutes`,
                from: '+16592175539',
                to: phoneNumber
            });
            return true;
        }
    }
    catch (err) {
        throw new customError_1.customError(err, 404);
    }
});
exports.phoneOtp = phoneOtp;
const verify = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const findOtp = yield userSchema_1.default.findOne({ otp });
    if (!findOtp && findOtp.otpExpiredAt < new Date()) {
        new customError_1.customError("OTP has been expired! Please try again!", 400);
    }
    else {
        yield userSchema_1.default.findByIdAndUpdate(findOtp._id, { otp: null, otpExpiredAt: null });
        return findOtp;
    }
});
exports.verify = verify;
