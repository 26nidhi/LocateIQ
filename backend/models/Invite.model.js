// server/models/Invite.model.js
import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // owner who generated the invite
      required: true,
    },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Invite", inviteSchema);
