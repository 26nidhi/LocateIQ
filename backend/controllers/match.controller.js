// server/controllers/match.controller.js
import Match from "../models/Match.model.js";

export const getMatchesForReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const matches = await Match.find({
      $or: [{ reportA: reportId }, { reportB: reportId }],
    }).populate("reportA reportB");
    res.json({ matches });
  } catch (err) {
    next(err);
  }
};

export const getMatchById = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId).populate({
      path: "reportA reportB",
      populate: { path: "reporterId", select: "name email" },
    });
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json({ match });
  } catch (err) {
    next(err);
  }
};
