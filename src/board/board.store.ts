import { create } from "zustand";
import { shuffleCards } from "./shuffle";
import { cardDeck } from "./board.constants";
import type { CardState } from "./card.types";

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
          // If two cards (not part of a found pair) are shown, hide them
          if (shownNotFoundCards.length === 2) {
            return flipOnlyTappedCardAndHideOthers(
              state,
              tappedCardIndex,
              cardToFlip,
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
function flipOnlyTappedCardAndHideOthers(
  state: BoardState,
  tappedCardIndex: number,
  cardToFlip: CardState,
) {
  // Flip only the tapped card (if not already flipped), hide the others.
  const isNewFlip = !cardToFlip.flipped;
  const newBoard = state.board.map((card, idx) => ({
    ...card,
    flipped: idx === tappedCardIndex && isNewFlip,
  }));
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
    if (first.card.color === second.card.color) {
      return board.map((card) => ({ ...card, pairFound: true }));
    }
  }
  return board;
}
