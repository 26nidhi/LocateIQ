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


dotenv.config({
  path: "./.env",
});
console.log("✅ ENV CHECK -> JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// ------------------ Middleware ------------------
app.use(express.json());

// ✅ CORS: Restrict only to frontend origin for both Express and Socket.IO
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ------------------ Database ------------------
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

// ------------------ Error Handler ------------------
app.use(errorHandler);

// ------------------ Server + Socket ------------------
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// ✅ Initialize socket with correct CORS
const io = initSocket(server);

// Attach io to req for event emits
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ------------------ Start Server ------------------
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
