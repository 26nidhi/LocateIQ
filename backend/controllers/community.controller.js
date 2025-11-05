// server/controllers/community.controller.js
import Community from "../models/Community.model.js";
import User from "../models/User.model.js";

/**
 * Create community (Admin already approves manually)
 * Currently unused since owners create via registerOwner flow.
 */
export const createCommunity = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const owner = req.user.id;

    const existing = await Community.findOne({ name });
    if (existing)
      return res.status(400).json({ message: "Community already exists" });

    const community = new Community({
      name,
      description,
      owner,
      members: [owner],
    });
    await community.save();

    res.status(201).json({ community });
  } catch (err) {
    next(err);
  }
};

/**
 * Join a community manually (fallback for admins)
 */
export const joinCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }

    res.json({ community });
  } catch (err) {
    next(err);
  }
};

/**
 * List all communities (for admin or user dashboard)
 */
export const listCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find()
      .populate("owner", "name email")
      .select("name description status");
    res.json({ communities });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all members of a specific community
 * Only owner (or admin) can view members.
 */
export const getCommunityMembers = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const community = await Community.findById(communityId)
      .populate("members", "name email role")
      .populate("owner", "name email");

    if (!community)
      return res.status(404).json({ message: "Community not found" });

    if (userRole !== "admin" && community.owner._id.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Only owner or admin can view members" });

    res.json({
      success: true,
      community: community.name,
      members: community.members,
    });
  } catch (err) {
    console.error("getCommunityMembers error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Remove a member from community
 * Only community owner can remove
 */
export const removeMember = async (req, res) => {
  try {
    const { communityId, memberId } = req.params;
    const ownerId = req.user.id;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    if (community.owner.toString() !== ownerId)
      return res.status(403).json({ message: "Only owner can remove members" });

    if (community.owner.toString() === memberId)
      return res
        .status(400)
        .json({ message: "Owner cannot remove themselves" });

    // Remove member
    community.members = community.members.filter(
      (id) => id.toString() !== memberId
    );
    await community.save();

    // Remove community reference from user's communities
    const member = await User.findById(memberId);
    if (member) {
      member.communities = member.communities.filter(
        (id) => id.toString() !== communityId
      );
      await member.save();
    }

    res.json({ success: true, message: "Member removed successfully" });
  } catch (err) {
    console.error("removeMember error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Optional: Promote a member to co-owner
 * (future use, keeps system flexible)
 */
export const promoteMember = async (req, res) => {
  try {
    const { communityId, memberId } = req.params;
    const ownerId = req.user.id;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ message: "Community not found" });
    if (community.owner.toString() !== ownerId)
      return res
        .status(403)
        .json({ message: "Only owner can promote members" });

    const member = await User.findById(memberId);
    if (!member) return res.status(404).json({ message: "User not found" });

    member.role = "communityOwner";
    await member.save();

    res.json({
      success: true,
      message: "Member promoted to community owner",
      member: { id: member._id, name: member.name, email: member.email },
    });
  } catch (err) {
    console.error("promoteMember error:", err);
    res.status(500).json({ message: err.message });
  }
};
