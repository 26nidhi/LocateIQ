import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
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
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// MongoDB connection
connectDB();

// ------------------ Routes ------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LocateIQ server is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chats", chatRoutes);

// Error handler middleware
app.use(errorHandler);

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ------------------ Socket.IO ------------------
const io = initSocket(server);

// Optional: attach io to requests if you want to use req.io in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});
