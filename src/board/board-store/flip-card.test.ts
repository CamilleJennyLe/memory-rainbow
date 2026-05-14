import { beforeEach, describe, expect, it } from "vitest";
import { useBoardStore } from "./board.store";

function resetBoardStore() {
  useBoardStore.setState({
    board: [],
  });
}

describe("Board Store - flipCard", () => {
  beforeEach(() => {
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
    expect(useBoardStore.getState().numberOfMoves).toBe(1);
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
    expect(useBoardStore.getState().numberOfMoves).toBe(0);
  });

  it("should show the third card and hide the other two cards if there are 2 cards shown which are not part of a found pair", () => {
    // Set up board state: 2 cards already flipped (not pairFound), 1 more not flipped
    const newBoard = [...useBoardStore.getState().board];
    newBoard[0] = { ...newBoard[0], flipped: true, pairFound: false };
    newBoard[1] = { ...newBoard[1], flipped: true, pairFound: false };
    useBoardStore.setState({ board: newBoard });

    // Attempt to flip the third card (index 2)
    useBoardStore.getState().flipCard(2);

    const { board } = useBoardStore.getState();
    expect(board[2].flipped).toBeTruthy();
    expect(board[0].flipped).toBeFalsy();
    expect(board[1].flipped).toBeFalsy();
    expect(useBoardStore.getState().numberOfMoves).toBe(1);
  });

  it("should hide the 2 cards shown which are not part of a found pair", () => {
    // Set up board state: 2 cards already flipped (not pairFound), 1 more not flipped
    const newBoard = [...useBoardStore.getState().board];
    newBoard[0] = { ...newBoard[0], flipped: true, pairFound: false };
    newBoard[1] = { ...newBoard[1], flipped: true, pairFound: false };
    useBoardStore.setState({ board: newBoard });

    // Attempt to flip the second card (index 1)
    useBoardStore.getState().flipCard(1);

    const { board } = useBoardStore.getState();
    expect(board[0].flipped).toBeFalsy();
    expect(board[1].flipped).toBeFalsy();
    expect(useBoardStore.getState().numberOfMoves).toBe(0);
  });

  it("should mark the found pairs when a card is flipped", () => {
    const newBoard = [...useBoardStore.getState().board].sort((a, b) =>
      a.cardClassName.localeCompare(b.cardClassName),
    );
    useBoardStore.setState({ board: newBoard });

    useBoardStore.getState().flipCard(0);
    useBoardStore.getState().flipCard(1);

    const { board } = useBoardStore.getState();
    expect(board[0].pairFound).toBeTruthy();
    expect(board[1].pairFound).toBeTruthy();
    expect(useBoardStore.getState().numberOfMoves).toBe(2);
  });

  it("should flip the cards following a found pair and keep the found pairs shown", () => {
    const newBoard = [...useBoardStore.getState().board].sort((a, b) =>
      a.cardClassName.localeCompare(b.cardClassName),
    );
    useBoardStore.setState({ board: newBoard });

    useBoardStore.getState().flipCard(0);
    useBoardStore.getState().flipCard(1);
    useBoardStore.getState().flipCard(2);
    useBoardStore.getState().flipCard(4);
    useBoardStore.getState().flipCard(6);
    const { board } = useBoardStore.getState();
    expect(board[0].flipped).toBeTruthy();
    expect(board[1].flipped).toBeTruthy();
    expect(board[2].flipped).toBeFalsy();
    expect(board[4].flipped).toBeFalsy();
    expect(board[6].flipped).toBeTruthy();
    expect(useBoardStore.getState().numberOfMoves).toBe(5);
  });
});
