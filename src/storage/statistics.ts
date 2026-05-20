import type { Statistics } from "../statistics/statistics.type";

export function saveStatistics(statistics: Statistics) {
  try {
    localStorage.setItem("statistics", JSON.stringify(statistics));
  } catch (error) {
    console.error("Failed to save statistics to localStorage:", error);
  }
}

export function getStatistics(): Statistics {
  try {
    const stats = localStorage.getItem("statistics");
    return stats ? JSON.parse(stats) : { gamesPlayed: 0, records: [] };
  } catch (error) {
    console.error("Failed to get statistics from localStorage:", error);
    return { gamesPlayed: 0, records: [] };
  }
}
