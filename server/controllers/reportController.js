// controllers/reportController.js
import Report from "../models/Report.js";

// Create a new lost/found report
export const createReport = async (req, res) => {
  try {
    const { type, title, description, latitude, longitude, imageUrl } =
      req.body;

    if (!req.user?.group) {
      return res.status(400).json({ message: "You must join a group first" });
    }

    const report = await Report.create({
      type,
      title,
      description,
      imageUrl,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
      group: req.user.group,
      user: req.user.id,
    });

    // TODO: plug in your match logic here if desired
    // const matches = await matchReports(report);

    res.status(201).json({
      message: "Report created successfully",
      report,
      // matches,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res
      .status(500)
      .json({ message: "Error creating report", error: error.message });
  }
};

// Get all reports in the user's group
export const getReports = async (req, res) => {
  try {
    if (!req.user?.group) {
      return res.status(400).json({ message: "You must join a group first" });
    }

    const reports = await Report.find({ group: req.user.group })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

// Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("user", "name email")
      .populate("group", "name location radius");

    if (!report) return res.status(404).json({ message: "Report not found" });

    // Allow if same group or owner
    const sameGroup =
      req.user?.group?.toString() === report.group?.id?.toString();
    const isOwner = report.user?.id?.toString() === req.user?.id;
    if (!sameGroup && !isOwner) {
      return res
        .status(403)
        .json({ message: "Not allowed to view this report" });
    }

    res.json(report);
  } catch (error) {
    console.error("Error getting report:", error);
    res
      .status(500)
      .json({ message: "Error getting report", error: error.message });
  }
};

// Update report status (e.g., open → returned/resolved)
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ALLOWED = ["open", "returned", "resolved"];
    if (!ALLOWED.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid status. Allowed: ${ALLOWED.join(", ")}` });
    }

    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Only owner can update their report
    if (report.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to update this report" });
    }

    report.status = status;
    report.resolvedAt =
      status === "returned" || status === "resolved" ? new Date() : undefined;
    await report.save();

    res.json({ message: "Status updated", report });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ message: "Error updating status", error: error.message });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Only owner can delete their report
    if (report.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete this report" });
    }

    await report.deleteOne();
    res.json({ message: "Report deleted" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
};
