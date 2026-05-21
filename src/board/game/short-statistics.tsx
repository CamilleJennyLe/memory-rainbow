import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store";
import { useRecordStore } from "../../statistics/store/statistics.store";
import { useBoardStore } from "../board-store/board.store";
import "./game.css";

export function ShortStatistics() {
  const { numberOfMoves } = useBoardStore();
  const { difficulty } = useDeckStore();
  const record = useRecordStore((state) => state.record);

  return (
    <div>
      <p>
        Coups:{" "}
        <span className="game-moves">
          {numberOfMoves} / {difficulty}
        </span>
      </p>
      <p>
        Record: <span className="game-best-record">{record ?? "-"}</span>
      </p>
    </div>
  );
}
