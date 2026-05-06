import { create } from "zustand";
import { shuffleCards } from "../shared/utils/shuffle";
import { cardDeck } from "./board.constants";
import type { CardState } from "../shared/types/card.types";

interface BoardState {
  board: CardState[];
  newGame: () => void;
  flipCard: (id: number) => void;
  setPairFound: (firstId: number, secondId: number) => void;
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
          return {
            board: state.board.map((card, index) => {
              if (index !== flippedCardIndex) return card;
              return { ...card, flipped: !card.flipped };
            }),
          };
        }),

      setPairFound: (firstIndex, secondIndex) =>
        set((state) => ({
          board: state.board.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, pairFound: true }
              : card,
          ),
        })),
    }) satisfies BoardState,
);
