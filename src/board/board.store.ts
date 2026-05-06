import { create } from "zustand";
import { shuffleCards } from "../shared/utils/shuffle";
import { cardDeck } from "./board.constants";
import type { CardState } from "../shared/types/card.types";

interface BoardState {
  board: CardState[];
  newGame: () => void;
  flipCard: (id: number) => void;
}

export const useBoardStore = create<BoardState>(
  (set) =>
    ({
      board: [],
      newGame: () =>
        set(() => {
          const shuffled = shuffleCards(cardDeck);
          return {
            board: [...shuffled],
          };
        }),
      flipCard: (flippedCardIndex) =>
        set((state) => {
          const alreadyFlippedCount = state.board.filter(
            (card) => card.flipped && !card.pairFound,
          ).length;
          const cardToFlip = state.board[flippedCardIndex];
          // Don't flip if card already has pairFound
          if (cardToFlip.pairFound) {
            return { board: state.board };
          }
          // Don't flip if two cards are already flipped (but not part of found pairs)
          if (!cardToFlip.flipped && alreadyFlippedCount >= 2) {
            return { board: state.board };
          }
          // Flip the card
          const newBoard = state.board.map((card, index) =>
            index === flippedCardIndex
              ? { ...card, flipped: !card.flipped }
              : card,
          );

          // After flipping, check for a found pair
          const flippedNotFoundCards = newBoard
            .map((card, idx) => ({ ...card, index: idx }))
            .filter((card) => card.flipped && !card.pairFound);

          if (flippedNotFoundCards.length === 2) {
            const [first, second] = flippedNotFoundCards;
            if (first.color === second.color) {
              // It's a pair! Mark them as found
              return {
                board: newBoard.map((card, idx) =>
                  idx === first.index || idx === second.index
                    ? { ...card, pairFound: true }
                    : card,
                ),
              };
            }
          }

          return { board: newBoard };
        }),
    }) satisfies BoardState,
);
