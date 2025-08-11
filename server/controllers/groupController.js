import Group from "../models/Group.js";
import User from "../models/User.js";

// GET nearby groups based on location
export const getNearbyGroups = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // radius in meters

    const groups = await Group.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    });

    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching groups", error: error.message });
  }
};

// POST create new group
export const createGroup = async (req, res) => {
  try {
    const { groupName, latitude, longitude, radius } = req.body;

    const group = new Group({
      groupName,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      radius,
      members: [req.user._id],
    });

    await group.save();

    // Update user's group
    await User.findByIdAndUpdate(req.user._id, { group: group._id });

    res.status(201).json(group);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating group", error: error.message });
  }
};

// POST join existing group
export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Add user if not already a member
    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
    }

    // Update user's group
    await User.findByIdAndUpdate(req.user._id, { group: groupId });

    res.json({ message: "Joined group successfully", group });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error joining group", error: error.message });
  }
};
