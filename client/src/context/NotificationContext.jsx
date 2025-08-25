import { createContext, useState, useEffect } from "react";
import socket from "../services/socket";

export const NotificationContext = createContext();

export function NotificationProvider({ children, groupId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    socket.connect();
    socket.emit("joinGroup", groupId);

    socket.on("newReport", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    socket.on("matchFound", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [groupId]);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
