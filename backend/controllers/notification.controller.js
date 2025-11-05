// server/controllers/notification.controller.js
import Notification from "../models/Notification.model.js";

/**
 * GET /api/notifications
 * Fetch user notifications with filters & pagination
 */
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, status, type } = req.query;

    const query = { user: userId };

    // Filter by read/unread
    if (status === "unread") query.read = false;
    else if (status === "read") query.read = true;

    // Filter by notification type (optional meta.type)
    if (type) query["meta.type"] = type;

    const skip = (Number(page) - 1) * Number(limit);

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Notification.countDocuments(query);

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalNotifications: total,
      notifications,
    });
  } catch (err) {
    console.error("getNotifications error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/notifications/unread-count
 * Returns unread notification count for badge indicator
 */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      read: false,
    });
    res.json({ success: true, unreadCount: count });
  } catch (err) {
    console.error("getUnreadCount error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/notifications/:id/read
 * Mark a specific notification as read
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { read: true },
      { new: true }
    );
    if (!note)
      return res.status(404).json({ message: "Notification not found" });

    res.json({ success: true, notification: note });
  } catch (err) {
    console.error("markAsRead error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/notifications/mark-all-read
 * Mark all unread notifications as read
 */
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );
    res.json({
      success: true,
      message: `Marked ${result.modifiedCount} notifications as read`,
    });
  } catch (err) {
    console.error("markAllAsRead error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
