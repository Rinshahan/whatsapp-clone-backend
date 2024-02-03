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
exports.phoneOtp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
const phoneValidation_1 = __importDefault(require("../utils/phoneValidation"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const otpSchema_1 = __importDefault(require("../schemas/otpSchema"));
dotenv_1.default.config({ path: './config.env' });
const client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const phoneOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, phoneValidation_1.default)(phoneNumber)) { // validating phone number
            return false;
        }
        else {
            const otp = (0, generateOtp_1.default)(); // generate otp
            // store otp in db with expiration
            const otpData = new otpSchema_1.default({
                phoneNumber,
                otp,
                expiresAt: new Date
            });
            yield otpData.save();
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
        console.log(err);
        return false;
    }
});
exports.phoneOtp = phoneOtp;
