import type { Difficulty } from "../card-deck/difficulty";

export interface Record {
  difficulty: Difficulty;
  bestScore: number;
  worstScore: number;
}
export interface Statistics {
  gamesPlayed: number;
  records: Record[];
}
