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
      flipCard: (flippedCardIndex) =>
        set((state) => {
          const alreadyFlippedCount = state.board.filter(
            (card) => card.flipped && !card.pairFound,
          ).length;
          const cardToFlip = state.board[flippedCardIndex];

          // Don't flip if card already has pairFound
          if (cardToFlip.pairFound) {
            return { board: state.board, numberOfMoves: state.numberOfMoves };
          }

          // Don't flip if two cards are already flipped (but not part of found pairs)
          if (!cardToFlip.flipped && alreadyFlippedCount >= 2) {
            return { board: state.board, numberOfMoves: state.numberOfMoves };
          }

          // Determine if the card will actually be flipped
          const willBeFlipped = !cardToFlip.flipped;
          let numberOfMoves = state.numberOfMoves;

          const newBoard = state.board.map((card, index) =>
            index === flippedCardIndex
              ? { ...card, flipped: !card.flipped }
              : card,
          );

          if (willBeFlipped) {
            numberOfMoves += 1;
          }

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
                numberOfMoves,
              };
            }
          }

          return { board: newBoard, numberOfMoves };
        }),
    }) satisfies BoardState,
);
