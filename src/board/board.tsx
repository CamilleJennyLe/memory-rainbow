import { useEffect } from "react";
import Card from "../card/card";
import "./board.css";
import { useBoardStore } from "./board.store";
import Win from "./win/win";
function Board() {
  const { board, newGame, numberOfMoves } = useBoardStore();
  useEffect(() => {
    newGame();
  }, [newGame]);
  const isWin = board.every((card) => card.pairFound);
  return (
    <div className="container">
      <div className="actions">
        <p>Nombre de coups: {numberOfMoves}</p>
        <button className="new-game-button" onClick={newGame}>
          Nouvelle partie
        </button>
      </div>
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.cardClassName}`} index={index} />
        ))}
      </div>
      {isWin && <Win />}
    </div>
  );
}

export default Board;
