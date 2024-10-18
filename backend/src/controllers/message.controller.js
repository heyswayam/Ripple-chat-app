import { Chatgroup } from "../models/chatgroup.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../app.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.params;
    const { message } = req.body;

    // Verify that the senderId exists and is a valid user
    const sender = await User.findById(senderId);
    if (!sender) {
        throw new ApiError(404, "Sender not found");
    }

    // Verify that the receiverId exists and is a valid user
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        throw new ApiError(404, "Receiver not found");
    }

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
    const { senderId, receiverId } = req.params;

    // Verify that both senderId and receiverId exist and are valid users
    const [sender, receiver] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId)
    ]);

    if (!sender || !receiver) {
        throw new ApiError(404, "One or both users not found");
    }

    const chatgroup = await Chatgroup.findOne({
        participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!chatgroup) {
        throw new ApiError(404, "Chat group not found");
    }

    return res.status(200).json(new ApiResponse(200, chatgroup.messages, "Messages retrieved successfully"));
});