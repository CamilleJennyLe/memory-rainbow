import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store";
import { useRecordStore } from "../../statistics/store/statistics.store";
import { useBoardStore } from "../board-store/board.store";
import "./game.css";

export function ShortStatistics() {
  const { numberOfMoves } = useBoardStore();
  const { difficulty } = useDeckStore();
  const record = useRecordStore((state) => state.record);

  return (
    <p className="short-stats">
      <div>
        Coups:{" "}
        <span className="game-moves">
          {numberOfMoves} / {difficulty}
        </span>
      </div>
      <div>
        Record: <span className="game-best-record">{record ?? "-"}</span>
      </div>
    </p>
  );
}
