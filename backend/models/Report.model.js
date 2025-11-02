// server/models/Report.model.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    type: { type: String, enum: ["lost", "found"], required: true },
    images: [{ type: String }],
    location: { type: String },
    geo: { type: { type: String }, coordinates: [Number] }, // GeoJSON
    dateLostFound: { type: Date },
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "matched", "resolved", "flagged"],
      default: "open",
    },
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      default: null,
    },
  },
  { timestamps: true }
);

reportSchema.index({
  title: "text",
  category: "text",
  status: 1,
  communityId: 1,
});

export default mongoose.model("Report", reportSchema);
