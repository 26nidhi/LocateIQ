import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Community from "../models/Community.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

// Existing register, login, me will remain here ...

// New: community owner registration
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

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const mailHTML = `
      <h3>New Community Approval Request</h3>
      <p><b>Community:</b> ${communityName}</p>
      <p><b>Owner:</b> ${name} (${email})</p>
      <p><b>Description:</b> ${description || "N/A"}</p>
      <p>Login to admin dashboard to approve or reject.</p>
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
