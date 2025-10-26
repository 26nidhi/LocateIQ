// server/models/Match.model.js
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  reportA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
    required: true,
  },
  reportB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
    required: true,
  },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);
