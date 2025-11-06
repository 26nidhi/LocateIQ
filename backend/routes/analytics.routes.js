// server/routes/analytics.routes.js
import express from "express";
import {
  getOverviewStats,
  getReportsStats,
  getWeeklyMatchTrends,
  getTopCommunities,
} from "../controllers/analytics.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/overview", getOverviewStats);
router.get("/reports", getReportsStats);
router.get("/matches-weekly", getWeeklyMatchTrends);
router.get("/top-communities", getTopCommunities);

export default router;
