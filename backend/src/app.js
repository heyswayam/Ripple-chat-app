import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import { UserRoute } from "./routes/user.routes.js";
import { MessageRoute } from "./routes/message.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/user", UserRoute);
app.use("/message", MessageRoute);

// Socket.IO logic
const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (user) => {
    const userId = user.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = user.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    user.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };