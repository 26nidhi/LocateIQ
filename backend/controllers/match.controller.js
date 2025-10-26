// server/controllers/match.controller.js
import Match from "../models/Match.model.js";
import { findMatchesForReport } from "../services/matchService.js";

export const getMatchesForReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const Match = (await import("../models/Match.model.js")).default;

    const matches = await Match.find({
      $or: [{ reportA: reportId }, { reportB: reportId }],
    }).populate("reportA reportB");

    res.json({ matches });
  } catch (err) {
    next(err);
  }
};
