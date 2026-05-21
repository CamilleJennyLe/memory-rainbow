import type { Difficulty } from "../card-deck/difficulty";

export interface Score {
  difficulty: Difficulty;
  bestScore?: number;
  worstScore?: number;
}
export interface Statistics {
  gamesPlayed: number;
  scores: Score[];
}
