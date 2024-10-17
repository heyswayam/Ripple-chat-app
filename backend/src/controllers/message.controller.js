import { Chatgroup } from "../models/chatgroup.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../app.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotChatgroup = await Chatgroup.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!gotChatgroup) {
        gotChatgroup = await Chatgroup.create({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
    });

    if (newMessage) {
        gotChatgroup.messages.push(newMessage._id);
    }

    await Promise.all([gotChatgroup.save(), newMessage.save()]);

    // SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

export const getMessage = asyncHandler(async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const chatgroup = await Chatgroup.findOne({
        participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!chatgroup) {
        throw new ApiError(404, "Chat group not found");
    }

    return res.status(200).json(new ApiResponse(200, chatgroup.messages, "Messages retrieved successfully"));
});