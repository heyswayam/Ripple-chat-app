import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import { verifyJWTToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id", verifyJWTToken, sendMessage);
router.get("/:id", verifyJWTToken, getMessage);

export const MessageRoute = router;