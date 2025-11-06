// server/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Community from "../models/Community.model.js";
import Invite from "../models/Invite.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  createNotification,
  createActivity,
} from "../services/notificationService.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

// Helper: generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

/* ==========================================
   Normal user registration (with optional invite)
   ========================================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { invite: inviteToken } = req.query;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // If invite token provided, process it
    if (inviteToken) {
      const invite = await Invite.findOne({ token: inviteToken });
      if (!invite)
        return res.status(400).json({ message: "Invalid invite token" });
      if (invite.used)
        return res.status(400).json({ message: "Invite already used" });
      if (invite.expiresAt < new Date())
        return res.status(400).json({ message: "Invite expired" });
      if (invite.email !== email)
        return res
          .status(400)
          .json({ message: "Email must match invited email" });

      // Add user to community
      const community = await Community.findById(invite.communityId);
      if (community) {
        community.members.push(user._id);
        await community.save();

        user.communities.push(community._id);
        await user.save();
      }

      invite.used = true;
      await invite.save();

      // Log activity
      await createActivity(user._id, "invite.accept", "Invite", invite._id, {
        communityId: community?._id,
      });

      // Notify community owner (in-app + email)
      const ownerId = community?.owner;
      if (ownerId) {
        const title = "New Member Joined";
        const message = `${user.name} joined your community ${community.name}`;
        await createNotification(
          ownerId,
          title,
          message,
          {
            userId: user._id,
            communityId: community._id,
            email: community.owner.email,
          },
          "in_app"
        );
        await createNotification(
          ownerId,
          title,
          message,
          {
            userId: user._id,
            communityId: community._id,
            email: community.owner.email,
          },
          "email"
        );
      }
    }

    const token = generateToken(user);
    res.status(201).json({
      message: inviteToken
        ? "Signup successful and joined community"
        : "Signup successful",
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
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ==========================================
   Community Owner Registration
   ========================================== */
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

    owner.communities.push(community._id);
    await owner.save();

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const mailHTML = `
      <h3>New Community Approval Request</h3>
      <p><b>Community:</b> ${communityName}</p>
      <p><b>Owner:</b> ${name} (${email})</p>
      <p><b>Description:</b> ${description || "N/A"}</p>
    `;
    await sendEmail(adminEmail, "New Community Approval Request", mailHTML);

    // Activity log
    await createActivity(
      owner._id,
      "community.request",
      "Community",
      community._id,
      {
        communityName,
      }
    );

    // Notify owner confirmation
    await createNotification(
      owner._id,
      "Community Request Submitted",
      `Your community "${community.name}" request has been sent for admin approval.`,
      { communityId: community._id },
      "in_app"
    );

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

/* ==========================================
   Login User
   ========================================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate(
      "communities",
      "name status"
    );

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      message: "Login successful",
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

/* ==========================================
   Get Current User
   ========================================== */
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
