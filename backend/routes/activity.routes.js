// server/routes/activity.routes.js
import express from "express";
import {
  getActivities,
  getActivitiesByUser,
  clearOldActivities,
} from "../controllers/activity.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// All activity routes require authentication
router.use(authMiddleware);

// Admin: view all system activities
router.get("/", roleMiddleware("admin"), getActivities);

// Owner/Admin: view user-specific activity
router.get(
  "/user/:userId",
  roleMiddleware(["admin", "communityOwner"]),
  getActivitiesByUser
);

// Admin: clear old logs
router.delete("/clear", roleMiddleware("admin"), clearOldActivities);

export default router;
