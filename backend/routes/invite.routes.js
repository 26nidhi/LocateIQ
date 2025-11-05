// server/routes/invite.routes.js
import express from "express";
import {
  createInvite,
  validateInvite,
} from "../controllers/invite.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Owner creates invites
router.post(
  "/:communityId",
  authMiddleware,
  roleMiddleware("communityOwner"),
  createInvite
);

// Public route to validate invite token before signup
router.get("/validate/:token", validateInvite);

export default router;
