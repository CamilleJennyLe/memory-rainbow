import { describe, it, expect, beforeEach } from "vitest";
import { useDeckStore } from "./card-deck.store";
import { catDeck, rainbowDeck } from "../card-deck";
import { levelOne } from "../difficulty";
import type { CardState } from "../../board/card.types";

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

  it("should generate only rainbow cards when only rainbow deck is included", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: true,
        includeCats: false,
      },
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();

    expectDeckHasAllCardsTwice(rainbowDeck, generatedDeck);
  });
  it("should generate only cat cards when only cat deck is included", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: false,
        includeCats: true,
      },
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();

    expectDeckHasAllCardsTwice(catDeck, generatedDeck);
  });

  //it should use the two selected decks

  it("should generate 12 cards for difficulty level one (12 cards)", () => {
    useDeckStore.setState({
      config: {
        includeRainbow: true,
        includeCats: true,
      },
      difficulty: levelOne,
    });
    const generateDeck = useDeckStore.getState().generateDeck;
    const generatedDeck = generateDeck();
    expect(generatedDeck.length).toBe(12);
  });
});

function expectDeckHasAllCardsTwice(
  baseDeck: CardState[],
  generatedDeck: CardState[],
) {
  const baseCardClassNames = new Set(
    baseDeck.map((card) => card.cardClassName),
  );
  // Check each card in generatedDeck comes from baseDeck
  generatedDeck.forEach((card) => {
    expect(baseCardClassNames.has(card.cardClassName)).toBeTruthy();
  });

  // Also check that each card from generatedDeck appears exactly twice
  generatedDeck.forEach((card) => {
    expect(
      generatedDeck.filter(
        (anotherCard) => card.cardClassName === anotherCard.cardClassName,
      ).length,
    ).toBe(2);
  });
}
