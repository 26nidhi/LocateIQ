// server/jobs/cleanupJob.js
import cron from "node-cron";
import Notification from "../models/Notification.model.js";
import Activity from "../models/Activity.model.js";

/**
 * Runs daily at midnight.
 * Deletes:
 * - Notifications older than 90 days
 * - Activities older than 180 days
 */
export const startCleanupJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();

      const notificationCutoff = new Date(now - 90 * 24 * 60 * 60 * 1000);
      const activityCutoff = new Date(now - 180 * 24 * 60 * 60 * 1000);

      const [deletedNotes, deletedActs] = await Promise.all([
        Notification.deleteMany({ createdAt: { $lt: notificationCutoff } }),
        Activity.deleteMany({ createdAt: { $lt: activityCutoff } }),
      ]);

      console.log(
        `[Cleanup Job] Deleted ${deletedNotes.deletedCount} old notifications, ${deletedActs.deletedCount} activities`
      );
    } catch (err) {
      console.error("[Cleanup Job Error]", err.message);
    }
  });
};
