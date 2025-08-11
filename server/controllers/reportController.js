import Report from "../models/Report.js";
import Group from "../models/Group.js";
import matchReports from "../utils/matchAlgorithm.js";

// Create new lost/found report
export const createReport = async (req, res) => {
  try {
    const { type, title, description, latitude, longitude, imageUrl } =
      req.body;

    if (!req.user.group) {
      return res.status(400).json({ message: "You must join a group first" });
    }

    const report = new Report({
      type,
      title,
      description,
      imageUrl,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      group: req.user.group,
      user: req.user._id,
    });

    await report.save();

    // Match logic: find opposite type reports in same group
    const matches = await matchReports(report);

    res.status(201).json({
      message: "Report created successfully",
      report,
      matches,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating report", error: error.message });
  }
};

// Get all reports in the user's group
export const getReports = async (req, res) => {
  try {
    if (!req.user.group) {
      return res.status(400).json({ message: "You must join a group first" });
    }

    const reports = await Report.find({ group: req.user.group });
    res.json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};
