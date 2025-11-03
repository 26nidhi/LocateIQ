import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await seedAdmin(); // Seed admin after connection
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = await User.create({
      name: "System Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin seeded: ${admin.email}`);
  } catch (err) {
    console.error("Error seeding admin:", err.message);
  }
};

export default connectDB;
