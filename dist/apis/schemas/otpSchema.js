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
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    phoneNumber: String,
    otp: String,
    expiresAt: Date
});
otpSchema.index({ expiresAt: 1 });
const Otp = mongoose_1.default.model('otp', otpSchema);
mongoose_1.default.connection.on('connected', () => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Otp.deleteMany({ expiresAt: { $lt: new Date() } }); //  delete expired otps
            console.log("expired otp deleted successfully");
        }
        catch (err) {
            console.log("error deleting in expired otps:", err);
        }
    }), 120000); // runs every 2 minutes
}));
exports.default = Otp;
