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
        set((state) => ({
          board: state.board.map((card, index) =>
            index === flippedCardIndex
              ? { ...card, flipped: !card.flipped }
              : card,
          ),
        })),
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
