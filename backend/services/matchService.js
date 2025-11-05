// server/services/matchService.js
import OpenAI from "openai";
import natural from "natural";
import Match from "../models/Match.model.js";
import Report from "../models/Report.model.js";
import {
  createNotification,
  createActivity,
  resolveUserEmail,
} from "./notificationService.js";

const tokenizer = new natural.WordTokenizer();
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/* -------------------------------
   Cosine Similarity Helpers
-------------------------------- */
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return normA && normB ? dot / (normA * normB) : 0;
};

const calculateScoreFallback = (textA, textB) => {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(textA);
  tfidf.addDocument(textB);

  const allTerms = [...new Set(tokenizer.tokenize(textA + " " + textB))];
  const vectorA = [];
  const vectorB = [];

  allTerms.forEach((term) => {
    vectorA.push(tfidf.tfidf(term, 0));
    vectorB.push(tfidf.tfidf(term, 1));
  });

  const dot = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
  const magA = Math.sqrt(vectorA.reduce((acc, v) => acc + v * v, 0));
  const magB = Math.sqrt(vectorB.reduce((acc, v) => acc + v * v, 0));
  if (!magA || !magB) return 0;
  return dot / (magA * magB);
};

const calculateEmbeddingScore = async (textA, textB) => {
  if (!openai || process.env.USE_OPENAI_MATCHING !== "true")
    return calculateScoreFallback(textA, textB);

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [textA, textB],
    });
    const [vecA, vecB] = response.data.map((v) => v.embedding);
    return cosineSimilarity(vecA, vecB);
  } catch (err) {
    console.warn("[OpenAI Fallback]", err.message);
    return calculateScoreFallback(textA, textB);
  }
};

/* --------------------------------
   Internal: Notify users of a match
----------------------------------- */
const notifyMatchCreation = async (match, reportA, reportB, score) => {
  try {
    const title = "Potential Match Found";
    const message = `We found a potential match for your "${reportA.title}" report. Check details in your dashboard.`;

    // Notify both reporters
    const reporterA = reportA.reporterId;
    const reporterB = reportB.reporterId;

    // In-app
    await createNotification(
      reporterA,
      title,
      message,
      { matchId: match._id, reportId: reportB._id, score },
      "in_app"
    );
    await createNotification(
      reporterB,
      title,
      `Your report "${reportB.title}" matches with "${reportA.title}"`,
      { matchId: match._id, reportId: reportA._id, score },
      "in_app"
    );

    // Email
    const emailA = await resolveUserEmail(reporterA);
    const emailB = await resolveUserEmail(reporterB);

    if (emailA) {
      await createNotification(
        reporterA,
        "Match Alert!",
        `Your report "${reportA.title}" might match with "${reportB.title}".`,
        { matchId: match._id, email: emailA },
        "email"
      );
    }
    if (emailB) {
      await createNotification(
        reporterB,
        "Match Alert!",
        `Your report "${reportB.title}" might match with "${reportA.title}".`,
        { matchId: match._id, email: emailB },
        "email"
      );
    }

    // Log activity (for analytics/audit)
    await createActivity(null, "report.match", "Match", match._id, {
      reportA: reportA._id,
      reportB: reportB._id,
      score,
    });
  } catch (err) {
    console.error("[notifyMatchCreation Error]", err.message);
  }
};

/* --------------------------------
   findMatchesForReport()
----------------------------------- */
export const findMatchesForReport = async (report) => {
  const candidates = await Report.find({
    communityId: report.communityId,
    type: report.type === "lost" ? "found" : "lost",
    status: "open",
  });

  const matches = [];

  for (const candidate of candidates) {
    const textA = `${report.title} ${report.description || ""}`;
    const textB = `${candidate.title} ${candidate.description || ""}`;
    const score = await calculateEmbeddingScore(textA, textB);

    if (score >= 0.25) {
      matches.push({ candidate, score });

      const existing = await Match.findOne({
        $or: [
          { reportA: report._id, reportB: candidate._id },
          { reportA: candidate._id, reportB: report._id },
        ],
      });

      if (!existing) {
        const newMatch = await Match.create({
          reportA: report._id,
          reportB: candidate._id,
          score,
        });

        // Update reports (optional marking)
        await Report.findByIdAndUpdate(report._id, { status: "matched" });
        await Report.findByIdAndUpdate(candidate._id, { status: "matched" });

        // Notify both users about the match
        await notifyMatchCreation(newMatch, report, candidate, score);
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
};
