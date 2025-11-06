// server/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import inviteRoutes from "./routes/invite.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
// Later we’ll add communityRoutes, reportRoutes, etc.

dotenv.config();

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Allow requests from frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Add security headers
app.use(helmet());

// Log requests during development
app.use(morgan("dev"));

// Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
});
app.use(limiter);

// Test route to check server status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running!" });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handler
app.use(errorHandler);

export default app;
