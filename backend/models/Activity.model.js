// server/models/Activity.model.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who did it
    action: { type: String, required: true }, // e.g., "community.approve", "invite.create"
    targetModel: { type: String }, // e.g., "Community", "Invite"
    target: { type: mongoose.Schema.Types.ObjectId }, // id of target
    meta: { type: mongoose.Schema.Types.Mixed }, // additional data
  },
  { timestamps: true }
);

activitySchema.index({ actor: 1, action: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
