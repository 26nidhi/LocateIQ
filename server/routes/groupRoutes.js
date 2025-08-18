import express from "express";
import {
  getNearbyGroups,
  createGroup,
  joinGroup,
} from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get groups near the logged-in user
router.get("/nearby", protect, getNearbyGroups);

// Create a new group (community)
router.post("/", protect, createGroup);

// Join an existing group
router.post("/join/:groupId", protect, joinGroup);

export default router;
