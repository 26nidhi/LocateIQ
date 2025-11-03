import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Community from "../models/Community.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

// Helper to generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

/* ===============================
   Normal user registration (will later use invite)
   =============================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   Community Owner Registration
   =============================== */
export const registerOwner = async (req, res) => {
  try {
    const { name, email, password, communityName, description, location } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create owner user
    const hashedPassword = await bcrypt.hash(password, 10);
    const owner = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "communityOwner",
    });

    // Create pending community
    const community = await Community.create({
      name: communityName,
      description,
      location,
      owner: owner._id,
      members: [owner._id],
      status: "pending",
    });

    // Link community to owner
    owner.communities.push(community._id);
    await owner.save();

    // Notify admin via email
    const adminEmail = process.env.ADMIN_EMAIL;
    const mailHTML = `
      <h3>New Community Approval Request</h3>
      <p><b>Community:</b> ${communityName}</p>
      <p><b>Owner:</b> ${name} (${email})</p>
      <p><b>Description:</b> ${description || "N/A"}</p>
      <p>Please log in to the admin dashboard to approve or reject this request.</p>
    `;
    await sendEmail(adminEmail, "New Community Approval Request", mailHTML);

    res.status(201).json({
      message: "Signup successful. Waiting for admin approval.",
      owner: { id: owner._id, name: owner.name, email: owner.email },
      community: { id: community._id, status: community.status },
    });
  } catch (err) {
    console.error("Register owner error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   Login User
   =============================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        communities: user.communities,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   Get Current User
   =============================== */
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("communities", "name status");
    res.json({ user });
  } catch (err) {
    console.error("Get me error:", err);
    res.status(500).json({ message: err.message });
  }
};
