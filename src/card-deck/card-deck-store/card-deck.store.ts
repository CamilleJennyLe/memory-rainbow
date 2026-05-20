import { create } from "zustand";
import { aquaticDeck, catDeck, rainbowDeck } from "../card-deck";
import type { DeckConfig, DeckState } from "../card-deck.type";
import { levelOne, type Difficulty } from "../difficulty";
import { getDeckConfig } from "../../storage/card-deck-config";
import { saveDeckConfig } from "../../storage/card-deck-config";
import { shuffleCards } from "./shuffle";

export const useDeckStore = create<DeckState>(() => ({
  config: getDeckConfig(),
  difficulty: levelOne,
  generateDeck: () => {
    const config = useDeckStore.getState().config;
    const deck = [];
    if (config.includeRainbow) {
      deck.push(...rainbowDeck);
    }
    if (config.includeCats) {
      deck.push(...catDeck);
    }
    if (config.includeAquatic) {
      deck.push(...aquaticDeck);
    }
    const shuffledDeck = shuffleCards(deck);
    const difficulty = useDeckStore.getState().difficulty;
    const halfDeck = shuffledDeck.slice(0, Math.floor(difficulty / 2));
    return shuffleCards([...halfDeck, ...halfDeck]);
  },
  setConfig: (config: DeckConfig) => {
    useDeckStore.setState({ config });
    saveDeckConfig(config);
  },
  setDifficulty: (difficulty: Difficulty) => {
    useDeckStore.setState({ difficulty });
  },
}));
