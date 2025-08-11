import express from "express";
import { createReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a lost/found report
router.post("/", protect, createReport);

// Get all reports for a group
router.get("/", protect, getReports);

export default router;
