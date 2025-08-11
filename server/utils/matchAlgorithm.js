import Report from "../models/Report.js";

export default async function matchReports(newReport) {
  const oppositeType = newReport.type === "lost" ? "found" : "lost";

  // Find opposite type items in the same group
  const potentialMatches = await Report.find({
    type: oppositeType,
    group: newReport.group,
  });

  // Simple text matching (can be replaced with AI/NLP later)
  const matches = potentialMatches.filter(
    (item) =>
      item.title.toLowerCase().includes(newReport.title.toLowerCase()) ||
      (newReport.description &&
        item.description &&
        item.description
          .toLowerCase()
          .includes(newReport.description.toLowerCase()))
  );

  return matches;
}
