// client/src/components/ChatPanel.jsx
import React, { useState, useEffect } from "react";
import { getSocket } from "../socket";
import axios from "axios";

export default function ChatPanel({ matchId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chats/${matchId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (msg.matchId === matchId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [matchId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const socket = getSocket();
    const msgData = { matchId, text: input };
    try {
      // Emit to socket server
      socket.emit("sendMessage", msgData);
      setMessages((prev) => [
        ...prev,
        { ...msgData, _id: Date.now(), sender: "me" },
      ]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col space-y-2 border p-4 rounded bg-white dark:bg-gray-800">
      <div className="flex flex-col space-y-1 max-h-80 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`p-2 rounded ${
              m.sender === "me"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
