// server/routes/community.routes.js
import express from "express";
import {
  createCommunity,
  joinCommunity,
  listCommunities,
} from "../controllers/community.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // we’ll create this

const router = express.Router();

router.get("/", authMiddleware, listCommunities);
router.post("/", authMiddleware, createCommunity);
router.post("/:communityId/join", authMiddleware, joinCommunity);

export default router;
