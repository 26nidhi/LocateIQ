// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import http from "http";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import communityRoutes from "./routes/community.routes.js";
import reportRoutes from "./routes/report.routes.js";
import matchRoutes from "./routes/match.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import { initSocket } from "./socket.js";

dotenv.config();

const app = express();

// ------------------ Middleware ------------------
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// DB
connectDB();

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LocateIQ server is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chats", chatRoutes);

// Error handler (last)
app.use(errorHandler);

// ------------------ Server + Socket ------------------
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = initSocket(server);

// attach io to req so controllers can emit if needed
app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
