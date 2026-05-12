import { create } from "zustand";
import { levelOne, type Difficulty } from "./difficulty";
import type { CardState } from "../board/card.types";
import { catDeck, rainbowDeck } from "./card-deck";

interface DeckConfig {
  includeRainbow: boolean;
  includeCats: boolean;
}
interface DeckState {
  config: DeckConfig;
  difficulty: Difficulty;
  generateDeck: () => CardState[];
  setConfig: (config: DeckConfig) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

export const useDeckStore = create<DeckState>(() => ({
  config: {
    includeRainbow: true,
    includeCats: false,
  },
  difficulty: levelOne,
  generateDeck: () => {
    const config = useDeckStore.getState().config;
    const deck = [];
    if (config.includeRainbow) {
      deck.push(...rainbowDeck, ...rainbowDeck);
    }
    if (config.includeCats) {
      deck.push(...catDeck, ...catDeck);
    }
    return deck;
  },
  setConfig: (config: DeckConfig) => {
    useDeckStore.setState({ config });
  },
  setDifficulty: (difficulty: Difficulty) => {
    useDeckStore.setState({ difficulty });
  },
}));
