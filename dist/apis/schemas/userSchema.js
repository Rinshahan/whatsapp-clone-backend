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
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid Email']
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is Required']
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    profilepic: {
        type: String,
        required: false
    },
    accountCreatedDate: {
        type: Date,
        default: new Date().toDateString()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        next();
    });
});
userSchema.methods.comparePasswordinDb = (password, passwordDB) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, passwordDB);
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
