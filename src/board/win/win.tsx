import { getRandomFunFact } from "../../fun-facts";
import { useRecordStore } from "../../statistics/store/statistics.store";
import { useBoardStore } from "../board-store/board.store";
import "./win.css";

function Win() {
  const { newGame } = useBoardStore();
  function closeOverlay() {
    useRecordStore.getState().updateStatistics();
    newGame();
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
