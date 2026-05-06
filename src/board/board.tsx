import "./board.css";
import Card from "../card/card";
import { useBoardStore } from "./board.store";
import { useEffect } from "react";
function Board() {
  const { board, newGame, numberOfMoves } = useBoardStore();
  useEffect(() => {
    newGame();
  }, []);
  return (
    <div className="container">
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.color}`} index={index} />
        ))}
      </div>
      <div className="header">
        <button className="new-game-button" onClick={newGame}>
          New Game
        </button>
        <p>Number of moves: {numberOfMoves}</p>
      </div>
    </div>
  );
}

export default Board;
