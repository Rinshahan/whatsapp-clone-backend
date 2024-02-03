"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOtp = () => {
    let otp = '';
    for (let index = 0; index < 4; index++) {
        const randomVal = Math.round(Math.random() * 9);
        otp = otp + randomVal;
    }
    return otp;
};
exports.default = generateOtp;
