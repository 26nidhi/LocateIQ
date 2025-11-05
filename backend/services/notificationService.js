// server/services/notificationService.js

import Notification from "../models/Notification.model.js";
import Activity from "../models/Activity.model.js";
import User from "../models/User.model.js";
import { emitToUser } from "../socket.js";
import { sendEmail } from "../utils/sendEmail.js";

/**
 * ----------------------------------------------
 *  createNotification()
 * ----------------------------------------------
 * Create and optionally emit a notification to a user.
 * Supports both "in_app" and "email" channels.
 *
 * @param {ObjectId} userId - Target user ID
 * @param {String} title - Short notification title
 * @param {String} message - Message content
 * @param {Object} meta - Extra metadata (optional)
 * @param {"in_app"|"email"} channel - Notification type
 */
export const createNotification = async (
  userId,
  title,
  message,
  meta = {},
  channel = "in_app"
) => {
  try {
    // Save notification in DB
    const note = await Notification.create({
      user: userId,
      title,
      message,
      meta,
      channel,
    });

    // Emit via socket if in-app
    if (channel === "in_app") {
      emitToUser(userId, "notification", {
        id: note._id,
        title,
        message,
        meta,
        createdAt: note.createdAt,
      });
    }

    // Send email if channel = "email"
    if (channel === "email") {
      const emailAddress = meta.email || (await resolveUserEmail(userId));
      if (emailAddress) {
        try {
          await sendEmail(emailAddress, title, `<p>${message}</p>`);
        } catch (emailErr) {
          console.error("[Notification Email Error]", emailErr.message);
        }
      } else {
        console.warn(
          `[Notification Warning] No email found for user ${userId}`
        );
      }
    }

    return note;
  } catch (err) {
    console.error("[createNotification Error]", err.message);
    throw err;
  }
};

/**
 * ----------------------------------------------
 *  createActivity()
 * ----------------------------------------------
 * Log an activity (auditable system event)
 *
 * @param {ObjectId} actorId - Who performed the action
 * @param {String} action - e.g. "community.approve", "invite.create"
 * @param {String} [targetModel] - Optional: affected model name
 * @param {ObjectId} [targetId] - Optional: affected record ID
 * @param {Object} [meta] - Optional extra info
 */
export const createActivity = async (
  actorId,
  action,
  targetModel = null,
  targetId = null,
  meta = {}
) => {
  try {
    const act = await Activity.create({
      actor: actorId,
      action,
      targetModel,
      target: targetId,
      meta,
    });
    return act;
  } catch (err) {
    console.error("[createActivity Error]", err.message);
    throw err;
  }
};

/**
 * ----------------------------------------------
 *  resolveUserEmail()
 * ----------------------------------------------
 * Safely fetch a user's email by ID.
 *
 * @param {ObjectId} userId
 * @returns {Promise<string|null>}
 */
export const resolveUserEmail = async (userId) => {
  try {
    const user = await User.findById(userId).select("email");
    return user?.email || null;
  } catch {
    return null;
  }
};
