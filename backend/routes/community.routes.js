// server/routes/community.routes.js
import express from "express";
import {
  createCommunity,
  joinCommunity,
  listCommunities,
  getCommunityMembers,
  removeMember,
  promoteMember,
} from "../controllers/community.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// General community routes
router.get("/", authMiddleware, listCommunities);
router.post("/", authMiddleware, createCommunity);
router.post("/:communityId/join", authMiddleware, joinCommunity);

// Owner/Admin routes
router.get(
  "/:communityId/members",
  authMiddleware,
  roleMiddleware(["admin", "communityOwner"]),
  getCommunityMembers
);

router.delete(
  "/:communityId/members/:memberId",
  authMiddleware,
  roleMiddleware("communityOwner"),
  removeMember
);

router.post(
  "/:communityId/members/:memberId/promote",
  authMiddleware,
  roleMiddleware("communityOwner"),
  promoteMember
);

export default router;
