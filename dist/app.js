"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./apis/middlewares/errorHandler");
const userAuthRoutes_1 = __importDefault(require("./apis/routes/userAuthRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const customError_1 = require("./apis/utils/customError");
const otpRoutes_1 = __importDefault(require("./apis/routes/otpRoutes"));
const messageRoutes_1 = __importDefault(require("./apis/routes/messageRoutes"));
const userRoutes_1 = __importDefault(require("./apis/routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use('/api/user', userAuthRoutes_1.default, otpRoutes_1.default, userRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.all('*', (req, res, next) => {
    const error = new customError_1.customError(`can't find ${req.originalUrl} on the server`, 404);
    next(error);
});
app.use(errorHandler_1.errorHandler);
//app.use(globalErrorHandler)
exports.default = app;
