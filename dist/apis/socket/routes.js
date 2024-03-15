"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageController_1 = require("./controllers/messageController");
const roomController_1 = require("./controllers/roomController");
const videoCallController_1 = require("./controllers/videoCallController");
const invitationController_1 = require("./controllers/invitationController");
// Function to create unique room name for two users
const sockets = (socket, io) => {
    console.log("New User Connected", socket.id);
    const messageController = new messageController_1.MessageController(socket, io);
    const roomController = new roomController_1.RoomController(socket, io);
    const invitationController = new invitationController_1.InvitationController(socket, io);
    const videoController = new videoCallController_1.VideoCallController(socket, io);
    socket.on("send-message", messageController.sendMessage);
    socket.on('join-room', roomController.joinRoom);
    socket.on("send-invitation", invitationController.sendInvitation);
    socket.on("accept-invite", invitationController.acceptInvite);
    socket.on("reject-invite", invitationController.rejectInvite);
    socket.on("initiate-call", videoController.initiateCall);
    socket.on("answer-made", videoController.answerCall);
    socket.on("ice-candidate", videoController.iceCandidate);
};
exports.default = sockets;
