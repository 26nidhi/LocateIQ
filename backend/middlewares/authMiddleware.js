// server/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "name email role communities"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found or removed" });
    }

    req.user = user; // attach full user object
    next();
  } catch (err) {
    console.error("authMiddleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
