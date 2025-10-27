import express from "express";
import {
  createReport,
  getReportsByCommunity,
  getReportMatches,
} from "../controllers/report.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReport);
router.get("/community/:communityId", authMiddleware, getReportsByCommunity);
router.get("/:reportId/matches", authMiddleware, getReportMatches);

export default router;
