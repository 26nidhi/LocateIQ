require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // adjust path if needed

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  // Check if admin already exists
  const existingAdmin = await User.findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(0);
  }

  // Create admin
  const admin = new User({
    username: "admin",
    email: "admin@example.com",
    password: "Admin123!", // plaintext → will be hashed by your schema
    role: "Admin",
    isVerified: true,
  });

  await admin.save();
  console.log("Admin created successfully!");
  process.exit(0);
};

createAdmin();
