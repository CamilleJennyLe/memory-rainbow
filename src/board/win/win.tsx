import { getRandomFunFact } from "../../fun-facts";
import { updateStatistics } from "../../statistics/statistics";
import { useBoardStore } from "../board-store/board.store";
import "./win.css";

function Win() {
  const { newGame } = useBoardStore();
  function closeOverlay() {
    newGame();
    updateStatistics();
  }
  return (
    <div className="overlay" onClick={closeOverlay}>
      <div className="overlay-content">
        <h1>Bravo!</h1>
        <p>{getRandomFunFact()}</p>
      </div>
    </div>
  );
}

export default Win;
