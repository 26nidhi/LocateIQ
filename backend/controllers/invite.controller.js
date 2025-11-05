// server/controllers/invite.controller.js
import crypto from "crypto";
import Invite from "../models/Invite.model.js";
import Community from "../models/Community.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  createNotification,
  createActivity,
} from "../services/notificationService.js";

/**
 * POST /api/invite/:communityId
 * Create invite link (only community owner).
 */
export const createInvite = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { email } = req.body;
    const ownerId = req.user.id;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });
    if (community.owner.toString() !== ownerId)
      return res.status(403).json({ message: "Only owner can invite users" });
    if (community.status !== "approved")
      return res.status(400).json({ message: "Community not approved yet" });

    // Generate unique token (valid 7 days)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const invite = await Invite.create({
      email,
      communityId,
      token,
      expiresAt,
      createdBy: ownerId,
    });

    // Construct invite link
    const inviteLink = `${process.env.FRONTEND_URL}/signup?invite=${token}`;

    // Send invite email to user
    const mailHtml = `
      <p>You’ve been invited to join the community <strong>${community.name}</strong>.</p>
      <p>Click below to sign up (valid for 7 days):</p>
      <a href="${inviteLink}">${inviteLink}</a>
    `;
    await sendEmail(email, `Join ${community.name} on LocateIQ`, mailHtml);

    // Log activity
    await createActivity(ownerId, "invite.create", "Invite", invite._id, {
      invitedEmail: email,
      communityId,
    });

    // Notify owner (in-app)
    await createNotification(
      ownerId,
      "Invite Created",
      `Invite created for ${email} to join ${community.name}`,
      { inviteId: invite._id, communityId },
      "in_app"
    );

    res.status(201).json({
      success: true,
      message: `Invite sent to ${email}`,
      invite: { id: invite._id, email, expiresAt },
      link: inviteLink,
    });
  } catch (err) {
    console.error("createInvite error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/invite/validate/:token
 * Validate if invite token is still valid.
 */
export const validateInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const invite = await Invite.findOne({ token });

    if (!invite) return res.status(404).json({ message: "Invalid invite" });
    if (invite.used)
      return res.status(400).json({ message: "Invite already used" });
    if (invite.expiresAt < new Date())
      return res.status(400).json({ message: "Invite expired" });

    res.json({
      success: true,
      message: "Invite valid",
      invite: {
        email: invite.email,
        communityId: invite.communityId,
        expiresAt: invite.expiresAt,
      },
    });
  } catch (err) {
    console.error("validateInvite error:", err);
    res.status(500).json({ message: err.message });
  }
};
