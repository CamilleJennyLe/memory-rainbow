import { useBoardStore } from "../board-store/board.store";
import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store";
import "./game.css";

export function Moves() {
  const { numberOfMoves } = useBoardStore();
  const { difficulty } = useDeckStore();
  return (
    <p>
      Coups:{" "}
      <span className="game-moves">
        {numberOfMoves} / {difficulty}
      </span>
    </p>
  );
}
