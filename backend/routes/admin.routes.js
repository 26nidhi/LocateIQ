// server/routes/admin.routes.js
import express from "express";
import {
  listPendingCommunities,
  approveCommunity,
  rejectCommunity,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// All admin routes require authenticated admin
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

// List pending
router.get("/communities/pending", listPendingCommunities);

// Approve community
router.post("/communities/:communityId/approve", approveCommunity);

// Reject community with optional reason in body { reason: "..." }
router.post("/communities/:communityId/reject", rejectCommunity);

export default router;
