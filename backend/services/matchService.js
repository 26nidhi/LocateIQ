import OpenAI from "openai";
import natural from "natural";
import Match from "../models/Match.model.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const tokenizer = new natural.WordTokenizer();

// ---------- Utility: Cosine Similarity ----------
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return dot / (normA * normB);
};

// ---------- Fallback Similarity (TF-IDF) ----------
const calculateScoreFallback = (textA, textB) => {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(textA);
  tfidf.addDocument(textB);

  const vectorA = [];
  const vectorB = [];
  const allTerms = [...new Set(tokenizer.tokenize(textA + " " + textB))];

  allTerms.forEach((term) => {
    vectorA.push(tfidf.tfidf(term, 0));
    vectorB.push(tfidf.tfidf(term, 1));
  });

  const dot = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
  const magA = Math.sqrt(vectorA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vectorB.reduce((acc, val) => acc + val * val, 0));

  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

// ---------- OpenAI Matching ----------
const calculateEmbeddingScore = async (textA, textB) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [textA, textB],
    });
    const [vecA, vecB] = response.data.map((v) => v.embedding);
    return cosineSimilarity(vecA, vecB);
  } catch (err) {
    console.warn("⚠️ OpenAI matching failed, using fallback:", err.message);
    return calculateScoreFallback(textA, textB);
  }
};

// ---------- Main: findMatchesForReport ----------
export const findMatchesForReport = async (report) => {
  const Report = (await import("../models/Report.model.js")).default;

  const candidates = await Report.find({
    communityId: report.communityId,
    type: report.type === "lost" ? "found" : "lost",
    status: "open",
  });

  const matches = [];

  for (const candidate of candidates) {
    const textA = `${report.title} ${report.description}`;
    const textB = `${candidate.title} ${candidate.description}`;
    const score = await calculateEmbeddingScore(textA, textB);

    if (score >= 0.25) {
      // Adjust threshold if needed
      matches.push({ candidate, score });

      // Save match if not already present
      const existing = await Match.findOne({
        $or: [
          { reportA: report._id, reportB: candidate._id },
          { reportA: candidate._id, reportB: report._id },
        ],
      });

      if (!existing) {
        const match = new Match({
          reportA: report._id,
          reportB: candidate._id,
          score,
        });
        await match.save();
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
};
