// server/controllers/chat.controller.js
import Chat from "../models/Chat.model.js";

export const getChatByMatch = async (req, res, next) => {
  const { matchId } = req.params;
  try {
    const messages = await Chat.find({ matchId }).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
