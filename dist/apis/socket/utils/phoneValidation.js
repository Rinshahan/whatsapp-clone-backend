"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const validatePhoneNumber = (phoneNumber) => {
    const client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    try {
        client.lookups.v1.phoneNumbers(phoneNumber).fetch();
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.default = validatePhoneNumber;
