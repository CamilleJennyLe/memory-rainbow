import { useEffect } from "react";
import { useBoardStore } from "./board-store/board.store";
import Win from "./win/win";
import { Game } from "./game/game";
import { preloadAllDecks } from "../utils/imagePreloader";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";

function Board() {
  const { board, newGame } = useBoardStore();
  const { config } = useDeckStore();
  useEffect(() => {
    newGame();
  }, [newGame]);
  useEffect(() => {
    preloadAllDecks();
  }, [config]);
  const isWin = board.every((card) => card.pairFound);

  return (
    <>
      <Game />
      {isWin && <Win />}
    </>
  );
}

export default Board;
