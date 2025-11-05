// server/routes/notification.routes.js
import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Fetch paginated and filtered notifications
router.get("/", getNotifications);

// Get unread notification count
router.get("/unread-count", getUnreadCount);

// Mark one notification as read
router.post("/:id/read", markAsRead);

// Mark all notifications as read
router.post("/mark-all-read", markAllAsRead);

export default router;
