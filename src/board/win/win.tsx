import { getRandomFunFact } from "../../fun-facts";
import { useBoardStore } from "../board-store/board.store";
import "./win.css";

function Win() {
  const { newGame } = useBoardStore();
  function closeOverlay() {
    newGame();
  }
  return (
    <div className="overlay" onClick={closeOverlay}>
      <div className="overlay-content">
        <h1>Gagné!</h1>
        <p>{getRandomFunFact()}</p>
      </div>
    </div>
  );
}

export default Win;
