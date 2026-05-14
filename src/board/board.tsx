import { useEffect } from "react";
import "./board.css";
import { useBoardStore } from "./board-store/board.store";
import Win from "./win/win";
import { CardDeckConfig } from "../card-deck/card-deck-config";
import { Game } from "./game/game";
function Board() {
  const { board, newGame } = useBoardStore();
  useEffect(() => {
    newGame();
  }, [newGame]);
  const isWin = board.every((card) => card.pairFound);
  return (
    <div className="container">
      <Game />
      <CardDeckConfig />
      {isWin && <Win />}
    </div>
  );
}

export default Board;
