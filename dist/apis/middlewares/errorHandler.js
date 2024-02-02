"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.globalErrorHandler = void 0;
const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
};
exports.globalErrorHandler = globalErrorHandler;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
