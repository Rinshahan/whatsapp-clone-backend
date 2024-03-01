"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
    }
}
exports.BaseController = BaseController;
