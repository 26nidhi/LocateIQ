import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // Joined group
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
