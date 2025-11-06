// server/controllers/admin.controller.js
import Community from "../models/Community.model.js";
import User from "../models/User.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  createNotification,
  createActivity,
} from "../services/notificationService.js";
/**
 * GET /api/admin/communities/pending
 * Returns list of communities awaiting approval.
 */
export const listPendingCommunities = async (req, res) => {
  try {
    const pending = await Community.find({ status: "pending" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, pending });
  } catch (err) {
    console.error("listPendingCommunities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/admin/communities/:communityId/approve
 * Approve a pending community.
 * - sets community.status = "approved"
 * - ensures owner.communities includes the community id
 * - sends email notification to owner
 */
export const approveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId).populate(
      "owner",
      "name email"
    );

    if (!community)
      return res.status(404).json({ message: "Community not found" });
    if (community.status === "approved")
      return res.status(400).json({ message: "Community already approved" });

    community.status = "approved";
    await community.save();

    // Ensure owner has the community in their list
    const owner = await User.findById(community.owner._id);
    if (!owner.communities.includes(community._id)) {
      owner.communities.push(community._id);
      await owner.save();
    }

    // Activity log
    await createActivity(
      req.user._id,
      "community.approve",
      "Community",
      community._id,
      {
        approvedBy: req.user._id,
      }
    );

    // Send in-app notification and email
    const title = "Community Approved";
    const message = `Your community "${community.name}" has been approved by the admin.`;
    await createNotification(
      owner._id,
      title,
      message,
      { communityId: community._id, email: owner.email },
      "in_app"
    );
    // also send email notification async (channel email)
    await createNotification(
      owner._id,
      title,
      message,
      { communityId: community._id, email: owner.email },
      "email"
    );

    res.json({ success: true, message: "Community approved", community });
  } catch (err) {
    console.error("approveCommunity error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/admin/communities/:communityId/reject
 * Reject a pending community with optional reason.
 * - sets community.status = "rejected"
 * - sends email to owner with reason
 */
export const rejectCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { reason } = req.body;

    const community = await Community.findById(communityId).populate(
      "owner",
      "name email"
    );

    if (!community)
      return res.status(404).json({ message: "Community not found" });
    if (community.status === "rejected")
      return res.status(400).json({ message: "Community already rejected" });

    community.status = "rejected";
    await community.save();

    // Notify owner
    const mailHtml = `
      <p>Hello ${community.owner.name},</p>
      <p>We regret to inform you that your community <strong>${
        community.name
      }</strong> was rejected by the admin.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p>If you have questions, contact the administrator.</p>
    `;
    await sendEmail(
      community.owner.email,
      "Community Request Rejected",
      mailHtml
    );

    res.json({ success: true, message: "Community rejected", community });
  } catch (err) {
    console.error("rejectCommunity error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
