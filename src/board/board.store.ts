import { create } from "zustand";
import { useDeckStore } from "../card-deck/card-deck.store";
import type { CardState } from "./card.types";
import { shuffleCards } from "./shuffle";

interface BoardState {
  board: CardState[];
  numberOfMoves: number;
  newGame: () => void;
  flipCard: (id: number) => void;
}

export const useBoardStore = create<BoardState>(
  (set) =>
    ({
      board: [],
      numberOfMoves: 0,
      newGame: () =>
        set(() => {
          const cardDeck = useDeckStore.getState().generateDeck();
          const shuffled = shuffleCards(cardDeck);
          return {
            board: [...shuffled],
            numberOfMoves: 0,
          };
        }),
      flipCard: (tappedCardIndex) =>
        set((state) => {
          const cardToFlip = state.board[tappedCardIndex];

          // Don't flip if card already has pairFound
          if (cardToFlip.pairFound) {
            return { board: state.board, numberOfMoves: state.numberOfMoves };
          }

          // Get currently shown cards which are not part of a found pair
          const shownNotFoundCards = getShownNotFoundCards(state.board);

          // If two mismatched cards are shown, then hide them
          if (
            shownNotFoundCards.length === 2 &&
            !shownNotFoundCards.every(({ card }) => card.pairFound)
          ) {
            return flipTappedCardAndHideMismatched(
              state,
              tappedCardIndex,
              shownNotFoundCards,
            );
          }

          // Normal flip logic
          let newBoard = state.board.map((card, index) => {
            if (index === tappedCardIndex) {
              return { ...card, flipped: !card.flipped };
            }
            return card;
          });

          // After flipping, check for a found pair using helper function
          newBoard = updateBoardWithFoundPairIfAny(newBoard);

          const numberOfMoves = !cardToFlip.flipped
            ? state.numberOfMoves + 1
            : state.numberOfMoves;
          return { board: newBoard, numberOfMoves };
        }),
    }) satisfies BoardState,
);
function flipTappedCardAndHideMismatched(
  state: BoardState,
  tappedCardIndex: number,
  shownNotFoundCards: { card: CardState; index: number }[],
) {
  // Flip only the tapped card (if not already flipped), hide the others.
  const isNewFlip = !state.board[tappedCardIndex].flipped;
  const newBoard = state.board.map((card, idx) => {
    if (idx === tappedCardIndex && isNewFlip) {
      return {
        ...card,
        flipped: true,
      };
    }
    if (shownNotFoundCards.some(({ index }) => index === idx)) {
      return { ...card, flipped: false };
    }
    return card;
  });
  const numberOfMoves = isNewFlip
    ? state.numberOfMoves + 1
    : state.numberOfMoves;
  return { board: newBoard, numberOfMoves };
}
function getShownNotFoundCards(
  board: CardState[],
): { card: CardState; index: number }[] {
  return board
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.flipped && !card.pairFound);
}
function updateBoardWithFoundPairIfAny(board: CardState[]): CardState[] {
  const shownNotFoundCards = getShownNotFoundCards(board);
  if (shownNotFoundCards.length === 2) {
    const [first, second] = shownNotFoundCards;
    if (first.card.cardClassName === second.card.cardClassName) {
      return board.map((card, index) =>
        index === first.index || index === second.index
          ? { ...card, pairFound: true }
          : card,
      );
    }
  }
  return board;
}
