import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create report
router.post("/", protect, createReport);

// Get all reports in user’s group
router.get("/", protect, getReports);

// Get single report by ID
router.get("/:id", protect, getReportById);

// Update report status
router.put("/:id/status", protect, updateReportStatus);

// Delete a report
router.delete("/:id", protect, deleteReport);

export default router;
