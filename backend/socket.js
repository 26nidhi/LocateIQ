// server/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Match from "./models/Match.model.js";
import Chat from "./models/Chat.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // ✅ frontend port
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // ✅ support both
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    console.log("🟡 Incoming socket auth token:", token);

    if (!token) {
      console.log("❌ No token provided");
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("✅ Token verified for user:", decoded);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      console.log("❌ Invalid token:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.userId}`);
    socket.join(socket.userId);

    // Message handler
    socket.on("sendMessage", async ({ matchId, text }) => {
      try {
        const chatMsg = await Chat.create({
          matchId,
          senderId: socket.userId,
          text,
        });

        const match = await Match.findById(matchId).populate("reportA reportB");
        if (!match) return;

        const users = [
          match.reportA.reporterId.toString(),
          match.reportB.reporterId.toString(),
        ];

        users.forEach((userId) => {
          io.to(userId).emit("newMessage", {
            _id: chatMsg._id,
            matchId,
            text: chatMsg.text,
            sender: socket.userId === userId ? "me" : "other",
            createdAt: chatMsg.createdAt,
          });
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.userId}`);
    });
  });

  return io;
};

// Notify match updates
export const notifyMatch = async (matchId) => {
  if (!io) return;
  const match = await Match.findById(matchId).populate("reportA reportB");
  if (!match) return;

  const users = [
    match.reportA.reporterId.toString(),
    match.reportB.reporterId.toString(),
  ];

  users.forEach((userId) => {
    io.to(userId).emit("newMatch", {
      matchId: match._id,
      reportA: match.reportA,
      reportB: match.reportB,
      score: match.score,
    });
  });
};
