// server/server.js
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { startCleanupJob } from "./jobs/cleanupJob.js";
import { startWeeklySummaryJob } from "./jobs/weeklySummaryJob.js";
import { initSocket } from "./socket.js";

dotenv.config();

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// ---------------------- Initialize Socket.IO ----------------------
const io = initSocket(server);
app.set("io", io); // attach instance if needed by routes/controllers

// ---------------------- Start Background Jobs ----------------------
startCleanupJob();
startWeeklySummaryJob();

// ---------------------- Start Server ----------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
