import express from "express";
import {
  register,
  login,
  me,
  registerOwner,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/register-owner", registerOwner);
router.post("/login", login);
router.get("/me", authMiddleware, me);

export default router;
