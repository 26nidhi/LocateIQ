// server/routes/match.routes.js
import express from "express";
import {
  getMatchesForReport,
  getMatchById,
} from "../controllers/match.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/report/:reportId", authMiddleware, getMatchesForReport);
router.get("/:matchId", authMiddleware, getMatchById);

export default router;
