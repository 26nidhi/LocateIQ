import Report from "../models/Report.js";
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

    // Run match algorithm for opposite type reports in same group
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

    const reports = await Report.find({ group: req.user.group }).populate(
      "user",
      "name email"
    );
    res.json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

// Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching report", error: error.message });
  }
};

// Update report status (e.g., Found, Returned)
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    report.status = status || report.status;
    await report.save();

    res.json({ message: "Report status updated", report });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating report", error: error.message });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await report.deleteOne();

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
};
