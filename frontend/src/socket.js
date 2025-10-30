// client/src/socket.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  if (!token) return;

  // connect to backend socket server
  socket = io("http://localhost:3000", {
    auth: { token },
  });

  // ✅ when connected
  socket.on("connect", () => {
    console.log("✅ Connected to socket server:", socket.id);
  });

  // ⚡ when disconnected
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket server");
  });

  // 🔔 Listen for match notification
  socket.on("matchFound", (data) => {
    console.log("🔔 New Match Found:", data);
    alert(data.message || "New item match detected!");
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
