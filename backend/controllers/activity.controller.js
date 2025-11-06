// server/controllers/activity.controller.js
import Activity from "../models/Activity.model.js";

/**
 * GET /api/activities
 * Admin: Fetch all activities (supports filtering, pagination, date range)
 */
export const getActivities = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action,
      userId,
      startDate,
      endDate,
    } = req.query;
    const query = {};

    if (action) query.action = action;
    if (userId) query.actor = userId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const activities = await Activity.find(query)
      .populate("actor", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Activity.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      activities,
    });
  } catch (err) {
    console.error("getActivities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/activities/user/:userId
 * Owner/Admin: Fetch all activities by a specific user
 */
export const getActivitiesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const activities = await Activity.find({ actor: userId })
      .populate("actor", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Activity.countDocuments({ actor: userId });

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      activities,
    });
  } catch (err) {
    console.error("getActivitiesByUser error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/activities/clear
 * Admin-only: Clears logs older than 90 days (or custom range)
 */
export const clearOldActivities = async (req, res) => {
  try {
    const { days = 90 } = req.query;
    const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await Activity.deleteMany({ createdAt: { $lt: threshold } });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} old activity logs`,
    });
  } catch (err) {
    console.error("clearOldActivities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
