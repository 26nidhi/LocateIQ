// server/controllers/report.controller.js
import Report from "../models/Report.model.js";
import Match from "../models/Match.model.js";
import { findMatchesForReport } from "../services/matchService.js";
import { notifyMatch } from "../socket.js";

export const createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      communityId,
      location,
      dateLostFound,
      category,
    } = req.body;
    const userId = req.user.id;
    const images = req.files?.map((f) => f.path) || [];

    const report = await Report.create({
      title,
      description,
      category,
      type,
      images,
      location,
      dateLostFound,
      communityId,
      reporterId: userId,
      status: "open",
    });

    const matches = await findMatchesForReport(report);

    // Notify for any newly created match documents
    for (const m of matches) {
      const matchDoc = await Match.findOne({
        $or: [
          { reportA: report._id, reportB: m.candidate._id },
          { reportA: m.candidate._id, reportB: report._id },
        ],
      });
      if (matchDoc) await notifyMatch(matchDoc._id);
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
    console.error("Error creating report:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getReportsByCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const reports = await Report.find({ communityId }).populate(
      "reporterId",
      "name email"
    );
    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

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
