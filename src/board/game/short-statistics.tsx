import { useBoardStore } from "../board-store/board.store";
import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store";
import "./game.css";
import { getStatistics } from "../../storage/statistics";

export function ShortStatistics() {
  const { numberOfMoves } = useBoardStore();
  const { difficulty } = useDeckStore();
  const bestScore = getStatistics().records.find(
    (record) => record.difficulty === difficulty,
  )?.bestScore;
  return (
    <div>
      <p>
        Coups:{" "}
        <span className="game-moves">
          {numberOfMoves} / {difficulty}
        </span>
      </p>
      <p>
        Record: <span className="game-best-record">{bestScore ?? "-"}</span>
      </p>
    </div>
  );
}
