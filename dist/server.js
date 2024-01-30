"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../config.env' });
const port = 3000;
(0, dbConnection_1.default)();
app_1.default.listen(port, () => {
    console.log(`Listening to ${port}`);
});
