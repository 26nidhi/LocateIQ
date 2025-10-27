// server/controllers/community.controller.js
import Community from "../models/Community.model.js";
import User from "../models/User.model.js";

export const createCommunity = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const owner = req.user.id; // from auth middleware

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

export const joinCommunity = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id; // from auth middleware

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

export const listCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find().populate("owner", "name email");
    res.json({ communities });
  } catch (err) {
    next(err);
  }
};
