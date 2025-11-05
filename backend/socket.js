// server/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Match from "./models/Match.model.js";
import Chat from "./models/Chat.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

let io = null;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // simple token auth for socket handshake
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.id;
      return next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    // join personal room
    console.log(`User connected: ${socket.userId}`);
    if (socket.userId) socket.join(socket.userId);

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
      // nothing special
    });
  });

  return io;
};

// Helper: emit event to a single user (if connected)
export const emitToUser = (userId, event, payload) => {
  if (!io) return;
  try {
    io.to(String(userId)).emit(event, payload);
  } catch (err) {
    console.error("emitToUser error:", err.message);
  }
};

// Notify match (keeps previous behavior, but simpler)
export const notifyMatch = async (matchId) => {
  if (!io) return;
  try {
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
  } catch (err) {
    console.error("notifyMatch error:", err.message);
  }
};
