// server/controllers/analytics.controller.js
import User from "../models/User.model.js";
import Community from "../models/Community.model.js";
import Report from "../models/Report.model.js";
import Match from "../models/Match.model.js";

/**
 * GET /api/analytics/overview
 * Returns top-level system counts
 */
export const getOverviewStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalCommunities,
      totalReports,
      totalMatches,
      pendingCommunities,
    ] = await Promise.all([
      User.countDocuments(),
      Community.countDocuments(),
      Report.countDocuments(),
      Match.countDocuments(),
      Community.countDocuments({ status: "pending" }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCommunities,
        totalReports,
        totalMatches,
        pendingCommunities,
      },
    });
  } catch (err) {
    console.error("getOverviewStats error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/analytics/reports
 * Returns distribution of lost vs found reports
 */
export const getReportsStats = async (req, res) => {
  try {
    const results = await Report.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = results.reduce((acc, r) => ({ ...acc, [r._id]: r.count }), {
      lost: 0,
      found: 0,
    });

    res.json({ success: true, data: stats });
  } catch (err) {
    console.error("getReportsStats error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/analytics/matches-weekly
 * Returns matches created per week (last 8 weeks)
 */
export const getWeeklyMatchTrends = async (req, res) => {
  try {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - 56); // last 8 weeks

    const matches = await Match.aggregate([
      {
        $match: { createdAt: { $gte: past } },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%U", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const trend = matches.map((m) => ({
      week: m._id,
      matches: m.count,
    }));

    res.json({ success: true, data: trend });
  } catch (err) {
    console.error("getWeeklyMatchTrends error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/analytics/top-communities
 * Returns top 5 communities by reports or member count
 */
export const getTopCommunities = async (req, res) => {
  try {
    const byReports = await Report.aggregate([
      {
        $group: {
          _id: "$communityId",
          reportCount: { $sum: 1 },
        },
      },
      { $sort: { reportCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "communities",
          localField: "_id",
          foreignField: "_id",
          as: "community",
        },
      },
      { $unwind: "$community" },
      {
        $project: {
          name: "$community.name",
          reportCount: 1,
        },
      },
    ]);

    const byMembers = await Community.aggregate([
      {
        $project: {
          name: 1,
          memberCount: { $size: "$members" },
        },
      },
      { $sort: { memberCount: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: { byReports, byMembers },
    });
  } catch (err) {
    console.error("getTopCommunities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
