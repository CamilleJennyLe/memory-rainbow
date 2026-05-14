import { beforeEach, describe, expect, it, vi } from "vitest";
import { rainbowDeck } from "../../card-deck/card-deck";
import { useBoardStore } from "./board.store";
import * as shuffleUtils from "../../card-deck/card-deck-store/shuffle";

function resetBoardStore() {
  useBoardStore.setState({
    board: [],
  });
}

const cardDeck = [...rainbowDeck, ...rainbowDeck];

describe("Board Store - newGame", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetBoardStore();
  });

  it("should shuffle the cards at each new game", () => {
    const firstShuffle = [...cardDeck];
    const secondShuffle = [...cardDeck].reverse();
    const mockShuffleCards = vi
      .spyOn(shuffleUtils, "shuffleCards")
      .mockReturnValueOnce(firstShuffle)
      .mockReturnValueOnce(secondShuffle);

    const makeNewGame = useBoardStore.getState().newGame;
    makeNewGame();
    const { board: initialCards1 } = useBoardStore.getState();
    makeNewGame();
    const { board: initialCards2 } = useBoardStore.getState();

    expect(mockShuffleCards).toHaveBeenCalledTimes(2);
    expect(initialCards1).not.toEqual(initialCards2);
  });

  it("should reset flipped and pairFound for all cards", () => {
    const finishedGame = cardDeck.map((card) => ({
      ...card,
      flipped: true,
      pairFound: true,
    }));
    useBoardStore.setState({
      board: finishedGame,
    });

    const makeNewGame = useBoardStore.getState().newGame;
    makeNewGame();

    const { board } = useBoardStore.getState();
    expect(board.some((card) => card.flipped)).toBeFalsy();
    expect(board.some((card) => card.pairFound)).toBeFalsy();
  });
});
