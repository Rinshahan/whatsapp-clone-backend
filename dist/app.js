"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./apis/middlewares/errorHandler");
const app = (0, express_1.default)();
app.all('*', (req, res, next) => {
    const error = new customError(`can't find ${req.originalUrl} on the server`, 404);
    next(error);
});
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
