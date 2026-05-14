import { useBoardStore } from "../board-store/board.store";
import "./game.css";

export function Replay() {
  const { newGame } = useBoardStore();
  return (
    <button className="new-game-button" onClick={newGame}>
      Rejouer
    </button>
  );
}
