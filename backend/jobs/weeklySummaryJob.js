// server/jobs/weeklySummaryJob.js
import cron from "node-cron";
import User from "../models/User.model.js";
import Notification from "../models/Notification.model.js";
import Match from "../models/Match.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const startWeeklySummaryJob = () => {
  // Runs every Monday at 8 AM
  cron.schedule("0 8 * * 1", async () => {
    console.log("[Weekly Summary Job] Running weekly summary emails...");

    try {
      const users = await User.find({}, "_id name email");
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      for (const user of users) {
        const unreadCount = await Notification.countDocuments({
          user: user._id,
          read: false,
        });

        const matchesCount = await Match.countDocuments({
          createdAt: { $gte: weekAgo },
        });

        if (!user.email) continue;

        const html = `
          <h2>Hi ${user.name},</h2>
          <p>Here’s your LocateIQ weekly summary:</p>
          <ul>
            <li><strong>New matches found this week:</strong> ${matchesCount}</li>
            <li><strong>Unread notifications:</strong> ${unreadCount}</li>
          </ul>
          <p>Visit your dashboard to view details.</p>
        `;

        await sendEmail(user.email, "Your Weekly LocateIQ Summary", html);
      }

      console.log("[Weekly Summary Job] Summary emails sent successfully.");
    } catch (err) {
      console.error("[Weekly Summary Job Error]", err.message);
    }
  });
};
