import { describe, it, expect, beforeEach } from "vitest";
import { useDeckStore } from "./card-deck.store";
import { catDeck, rainbowDeck } from "./card-deck";
import { levelOne } from "./difficulty";
import type { CardState } from "../board/card.types";

// Helper to reset zustand store state
function resetDeckStore() {
  useDeckStore.setState({
    config: {
      includeRainbow: true,
      includeCats: false,
    },
    difficulty: levelOne,
  });
}

describe("Deck Store - generateDeck", () => {
  beforeEach(() => {
    resetDeckStore();
  });

  it("should generate only rainbow cards (each card twice) when only rainbow deck is included", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: true,
        includeCats: false,
      },
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();

    expect(generatedDeck.length).toBe(rainbowDeck.length * 2);
    checkCardCount(rainbowDeck, generatedDeck);
  });
  it("should generate only cat cards (each card twice) when only cat deck is included", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: false,
        includeCats: true,
      },
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();

    expect(generatedDeck.length).toBe(catDeck.length * 2);
    checkCardCount(catDeck, generatedDeck);
  });
  it("should generate all cards twice when all decks are included", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: true,
        includeCats: true,
      },
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();

    const expectedLength = (rainbowDeck.length + catDeck.length) * 2;
    expect(generatedDeck.length).toBe(expectedLength);
    checkCardCount(rainbowDeck, generatedDeck);
    checkCardCount(catDeck, generatedDeck);
  });
});

function checkCardCount(baseDeck: CardState[], generatedDeck: CardState[]) {
  baseDeck.forEach((baseCard) => {
    const count = generatedDeck.filter(
      (card) => card.cardClassName === baseCard.cardClassName,
    ).length;
    expect(count).toBe(2);
  });
}
