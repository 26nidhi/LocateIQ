// client/src/components/ChatPanel.jsx
import React, { useState, useEffect, useContext } from "react";
import { getSocket } from "../socket";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function ChatPanel({ matchId }) {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chats/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      if (msg.matchId === matchId) setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [matchId, token]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = getSocket();
    socket.emit("sendMessage", { matchId, text: input });
    setMessages((prev) => [
      ...prev,
      { _id: Date.now(), matchId, text: input, sender: "me" },
    ]);
    setInput("");
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          placeholder="Type a message..."
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
