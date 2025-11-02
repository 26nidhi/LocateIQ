// server/routes/report.routes.js
import express from "express";
import {
  createReport,
  getReportsByCommunity,
  getReportMatches,
} from "../controllers/report.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.array("images"), createReport);
router.get("/community/:communityId", authMiddleware, getReportsByCommunity);
router.get("/:reportId/matches", authMiddleware, getReportMatches);

export default router;
