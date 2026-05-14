import { useEffect, useState } from "react";
import "./board.css";
import { useBoardStore } from "./board-store/board.store";
import Win from "./win/win";
import { CardDeckConfig } from "../card-deck/card-deck-config";
import { Game } from "./game/game";
function Board() {
  const { board, newGame } = useBoardStore();
  const [showDeckConfig, setShowDeckConfig] = useState(false);
  useEffect(() => {
    newGame();
  }, [newGame]);
  const isWin = board.every((card) => card.pairFound);
  if (showDeckConfig) {
    return (
      <div className="container">
        <CardDeckConfig hideDeckConfig={() => setShowDeckConfig(false)} />
      </div>
    );
  }
  return (
    <div className="container">
      <Game showDeckConfig={() => setShowDeckConfig(true)} />
      {isWin && <Win />}
    </div>
  );
}

export default Board;
