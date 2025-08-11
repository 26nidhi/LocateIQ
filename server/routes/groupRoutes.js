import express from "express";
import {
  getNearbyGroups,
  createGroup,
  joinGroup
} from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Find groups near user
router.get("/nearby", protect, getNearbyGroups);

// Create a new group
router.post("/", protect, createGroup);

// Join an existing group
router.post("/join/:groupId", protect, joinGroup);

export default router;
