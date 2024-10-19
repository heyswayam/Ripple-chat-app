import { Chatgroup } from "../models/chatgroup.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../app.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const sendMessage = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.params;
    const { message } = req.body;

    // Verify that the senderId and receiverId exist and are valid users
    const [sender, receiver] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId)
    ]);

    if (!sender || !receiver) {
        throw new ApiError(404, "One or both users not found");
    }

    // Create a temporary message object
    const tempMessage = {
        _id: new mongoose.Types.ObjectId().toString(), // Generate a temporary ID
        senderId,
        receiverId,
        message,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Emit the message via Socket.IO immediately
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", tempMessage);
    }

    // Send immediate response
    res.status(201).json(new ApiResponse(201, tempMessage, "Message sent successfully"));

    // Perform database operations asynchronously
    (async () => {
        try {
            let chatgroup = await Chatgroup.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!chatgroup) {
                chatgroup = await Chatgroup.create({
                    participants: [senderId, receiverId],
                });
            }

            const newMessage = await Message.create(tempMessage);

            chatgroup.messages.push(newMessage._id);
            await chatgroup.save();
            
        } catch (error) {
            console.error("Error in async database operations:", error);
            // Optionally, emit an error event to inform the client
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("messageError", {
                    tempId: tempMessage._id,
                    error: "Failed to save message"
                });
            }
        }
    })();
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