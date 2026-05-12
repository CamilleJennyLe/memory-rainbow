import { useEffect } from "react";
import Card from "../card/card";
import { getRandomFunFact } from "../fun-facts";
import "./board.css";
import { useBoardStore } from "./board.store";
function Board() {
  const { board, newGame, numberOfMoves } = useBoardStore();
  useEffect(() => {
    newGame();
  }, []);
  const isWin = board.every((card) => card.pairFound);
  function closeOverlay() {
    newGame();
  }
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
      {isWin && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content">
            <h1>Gagné!</h1>
            <p>{getRandomFunFact()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
