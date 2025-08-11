// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import connectDB from "./config/db.js";

// routes (placeholders — create these files later)
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Optional: enable Socket.IO later (keeps server export simple)
const io = new IOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
  },
});

// simple in-memory map for sockets (later move to redis for scale)
export const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("auth", (userId) => {
    if (userId) onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    // remove user mapping if any
    for (const [userId, sid] of onlineUsers.entries()) {
      if (sid === socket.id) onlineUsers.delete(userId);
    }
  });
});

// middlewares
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// mount routes (implement these files as you progress)
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/reports", reportRoutes);

// health check
app.get("/", (req, res) => res.send("TrackBack API is running"));

// global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
