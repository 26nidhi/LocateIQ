// client/src/socket.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  if (!token) {
    console.warn("⚠️ No token found, socket not connected");
    return;
  }

  socket = io("http://localhost:5000", {
    auth: { token },
    transports: ["websocket", "polling"], // ✅ fallback
    withCredentials: true,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("✅ Connected to socket server:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

  socket.on("newMatch", (data) => {
    console.log("🔔 New Match:", data);
  });

  socket.on("newMessage", (data) => {
    console.log("💬 New message:", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket server");
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
