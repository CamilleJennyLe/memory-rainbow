import { create } from "zustand";
import { catDeck, rainbowDeck } from "./card-deck";
import type { DeckConfig, DeckState } from "./card-deck.type";
import { levelOne, type Difficulty } from "./difficulty";
import { getDeckConfig } from "../storage/card-deck-config";
import { saveDeckConfig } from "../storage/card-deck-config";

export const useDeckStore = create<DeckState>(() => ({
  config: getDeckConfig(),
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
    saveDeckConfig(config);
  },
  setDifficulty: (difficulty: Difficulty) => {
    useDeckStore.setState({ difficulty });
  },
}));
