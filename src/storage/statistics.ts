import type { Statistics } from "../statistics/statistics.type";

export function saveStatistics(statistics: Statistics) {
  try {
    localStorage.setItem("statistics", JSON.stringify(statistics));
  } catch (error) {
    console.error("Failed to save statistics to localStorage:", error);
  }
}

const emptyStatistics: Statistics = { gamesPlayed: 0, scores: [] };

function normalizeStatistics(parsed: unknown): Statistics {
  if (!parsed || typeof parsed !== "object") {
    return emptyStatistics;
  }
  const { gamesPlayed, scores } = parsed as Partial<Statistics>;
  return {
    gamesPlayed: typeof gamesPlayed === "number" ? gamesPlayed : 0,
    scores: Array.isArray(scores) ? scores : [],
  };
}

export function getStatistics(): Statistics {
  try {
    const stats = localStorage.getItem("statistics");
    return stats ? normalizeStatistics(JSON.parse(stats)) : emptyStatistics;
  } catch (error) {
    console.error("Failed to get statistics from localStorage:", error);
    return emptyStatistics;
  }
}
