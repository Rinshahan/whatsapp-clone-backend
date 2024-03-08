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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallController = void 0;
const userServices_1 = require("../../services/userServices");
const baseController_1 = require("./baseController");
class VideoCallController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.initiateCall = ({ offer, roomId, caller, reciever }) => __awaiter(this, void 0, void 0, function* () {
            const callerData = yield (0, userServices_1.getOneUser)(caller);
            const recieverData = yield (0, userServices_1.getOneUser)(reciever);
            const data = {
                offer: offer,
                roomId: roomId,
                caller: callerData,
                reciever: recieverData
            };
            this.socket.broadcast.emit("incoming-call", data);
        });
        this.answerCall = ({}) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.VideoCallController = VideoCallController;
