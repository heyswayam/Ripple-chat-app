import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import { verifyJWTToken } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/send/:senderId/:receiverId", verifyJWTToken, sendMessage);
router.get("/get/:senderId/:receiverId", verifyJWTToken, getMessage);
export const MessageRoute = router;