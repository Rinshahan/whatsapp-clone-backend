"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    };
};
exports.default = asyncErrorHandler;
