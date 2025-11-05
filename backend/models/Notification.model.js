// server/models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String },
    meta: { type: mongoose.Schema.Types.Mixed }, // e.g. { type: 'match', matchId }
    channel: { type: String, enum: ["in_app", "email"], default: "in_app" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, read: 1 });

export default mongoose.model("Notification", notificationSchema);
