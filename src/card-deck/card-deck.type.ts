import type { CardState } from "../board/card.types";
import type { Difficulty } from "./difficulty";

export interface DeckConfig {
  includeRainbow: boolean;
  includeCats: boolean;
  includeAquatic: boolean;
}
export interface DeckState {
  config: DeckConfig;
  difficulty: Difficulty;
  generateDeck: () => CardState[];
  setConfig: (config: DeckConfig) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}
