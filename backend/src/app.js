import express, { query } from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import { UserRoute } from "./routes/user.routes.js";
import { MessageRoute } from "./routes/message.routes.js";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config({ path: "../.env" });
import { cronJob } from "./controllers/user.controller.js";
// console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
const app = express();
const server = http.createServer(app);


// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
		credentials: true,
	}),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/user", UserRoute);
app.use("/message", MessageRoute);
app.get("/", cronJob);

// Socket.IO logic
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
const userSocketMap = {}; // {userId: socketId}
const typingUsers = {}; // { userId: boolean }

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	// console.log("New connection established:", user.id);
	// console.log("User handshake query:", user.handshake.query);

	const userId = socket.handshake.query.userId;
	if (userId !== undefined) {
		userSocketMap[userId] = socket.id;
	}
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("typing", ({ receiverId, isTyping }) => {
        if (receiverId) {
            typingUsers[userId] = isTyping;
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("typingStatus", { userId, isTyping });
            }
        }
    });

	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		delete typingUsers[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
