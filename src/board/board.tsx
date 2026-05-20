import { useEffect, useState } from "react";
import "./board.css";
import { useBoardStore } from "./board-store/board.store";
import Win from "./win/win";
import { CardDeckConfig } from "../card-deck/card-deck-config";
import { Game } from "./game/game";
import { preloadAllDecks } from "../utils/imagePreloader";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";
function Board() {
  const { board, newGame } = useBoardStore();
  const [showDeckConfig, setShowDeckConfig] = useState(false);
  const { config } = useDeckStore();
  useEffect(() => {
    newGame();
  }, [newGame]);
  useEffect(() => {
    preloadAllDecks();
  }, [config]);
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
