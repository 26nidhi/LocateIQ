// server/controllers/report.controller.js
import Report from "../models/Report.model.js";
import { findMatchesForReport } from "../services/matchService.js";
import Match from "../models/Match.model.js";

// ✅ Create new report
export const createReport = async (req, res) => {
  try {
    const { title, description, type, communityId, location, image } = req.body;
    const userId = req.user.id;

    const report = new Report({
      title,
      description,
      type, // "lost" or "found"
      communityId,
      location,
      image,
      createdBy: userId,
      status: "open",
    });

    await report.save();

    // 🔍 Automatically find matches
    const matches = await findMatchesForReport(report);

    // 🔔 Optionally: Emit real-time notifications via Socket.IO
    // (Only if you're using sockets)
    if (req.io && matches.length > 0) {
      matches.forEach(({ candidate, score }) => {
        // Notify the matched report's owner
        req.io.to(candidate.createdBy.toString()).emit("matchFound", {
          matchId: report._id,
          matchedWith: candidate._id,
          score,
          message: `Possible match found for your ${candidate.type} item!`,
        });
      });
    }

    res.status(201).json({
      success: true,
      report,
      matches,
      message: matches.length
        ? `Report created and ${matches.length} potential matches found`
        : "Report created successfully, no matches yet.",
    });
  } catch (err) {
    console.error("❌ Error creating report:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Get all reports in a community
export const getReportsByCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const reports = await Report.find({ communityId }).populate(
      "createdBy",
      "name email"
    );
    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get matches for a specific report
export const getReportMatches = async (req, res) => {
  try {
    const { reportId } = req.params;

    const matches = await Match.find({
      $or: [{ reportA: reportId }, { reportB: reportId }],
    })
      .populate("reportA")
      .populate("reportB");

    res.status(200).json({ success: true, matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
