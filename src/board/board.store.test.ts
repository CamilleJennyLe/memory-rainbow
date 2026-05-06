import { describe, it, expect, beforeEach, vi } from "vitest";
import { useBoardStore } from "./board.store";
import { cardDeck } from "./board.constants";
import * as shuffleUtils from "../shared/utils/shuffle";

function resetBoardStore() {
  useBoardStore.setState({
    board: [],
  });
}

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

describe("Board Store - flipCard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetBoardStore();
    useBoardStore.getState().newGame();
  });
  it("should flip the card at the given index", () => {
    const indexToFlip = 3;

    useBoardStore.getState().flipCard(indexToFlip);

    const { board } = useBoardStore.getState();
    expect(board[indexToFlip].flipped).toBe(true);
    // Other cards should remain unflipped
    expect(
      board.some((card, idx) => idx !== indexToFlip && card.flipped),
    ).toBeFalsy();
  });
  it("should not flip the card if the card is part of a pair found", () => {
    const indexWithPairFound = 2;
    const newBoard = [...useBoardStore.getState().board];
    newBoard[indexWithPairFound] = {
      ...newBoard[indexWithPairFound],
      pairFound: true,
      flipped: false,
    };
    useBoardStore.setState({
      board: newBoard,
    });

    useBoardStore.getState().flipCard(indexWithPairFound);

    const { board } = useBoardStore.getState();
    expect(board[indexWithPairFound].flipped).toBeFalsy();
  });

  it("should not flip the card if there are already 2 cards shown and are not part of a found pair", () => {
    // Set up board state: 2 cards already flipped (not pairFound), 1 more not flipped
    const newBoard = [...useBoardStore.getState().board];
    newBoard[0] = { ...newBoard[0], flipped: true, pairFound: false };
    newBoard[1] = { ...newBoard[1], flipped: true, pairFound: false };
    useBoardStore.setState({ board: newBoard });

    // Attempt to flip the third card (index 2)
    useBoardStore.getState().flipCard(2);

    const { board } = useBoardStore.getState();
    expect(board[2].flipped).toBeFalsy();
  });
});
