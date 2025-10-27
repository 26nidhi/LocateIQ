// server/routes/chat.routes.js
import express from "express";
import { getChatByMatch } from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:matchId", authMiddleware, getChatByMatch);

export default router;
