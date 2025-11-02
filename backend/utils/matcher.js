import OpenAI from "openai";
import Item from "../models/items.model.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const findMatches = async (newItem) => {
  const oppositeType = newItem.type === "found" ? "lost" : "found";
  const candidates = await Item.find({
    type: oppositeType,
    communityId: newItem.communityId,
  });

  let bestMatch = null;
  let bestScore = 0;

  for (const candidate of candidates) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [newItem.description, candidate.description],
    });
    const [vecA, vecB] = response.data.map((v) => v.embedding);
    const sim = cosineSimilarity(vecA, vecB);
    if (sim > 0.85 && sim > bestScore) {
      bestScore = sim;
      bestMatch = candidate;
    }
  }
  return bestMatch;
};

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return dot / (normA * normB);
};
