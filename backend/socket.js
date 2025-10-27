import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Match from "./models/Match.model.js";
import Chat from "./models/Chat.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  // Authenticate socket
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);
    socket.join(socket.userId); // join user-specific room

    // ------------------ Handle Chat ------------------
    socket.on("sendMessage", async ({ matchId, text }) => {
      try {
        const chatMsg = await Chat.create({
          matchId,
          senderId: socket.userId,
          text,
        });

        const match = await Match.findById(matchId);
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
          });
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });

  return io;
};

// ------------------ Notify Match ------------------
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
