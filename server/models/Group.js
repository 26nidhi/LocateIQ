import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    radius: { type: Number, default: 5000 }, // in meters
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

groupSchema.index({ location: "2dsphere" }); // For geo queries

export default mongoose.model("Group", groupSchema);
