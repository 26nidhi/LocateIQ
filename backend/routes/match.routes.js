// server/routes/match.routes.js
import express from "express";
import { getMatchesForReport } from "../controllers/match.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:reportId", authMiddleware, getMatchesForReport);

export default router;
