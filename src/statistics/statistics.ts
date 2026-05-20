import { useBoardStore } from "../board/board-store/board.store";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";
import { getStatistics, saveStatistics } from "../storage/statistics";
import type { Record } from "./statistics.type";

function updateRecords(): Record[] {
  const statistics = getStatistics();
  const { records } = statistics;
  const { difficulty } = useDeckStore.getState();
  const { numberOfMoves } = useBoardStore.getState();
  return records.map((record) => {
    if (record.difficulty !== difficulty) {
      return record;
    }
    let newBest = record.bestScore ?? 0;
    let newWorst = record.worstScore ?? 0;

    if (numberOfMoves < newBest) {
      newBest = numberOfMoves;
    }
    if (numberOfMoves > newWorst) {
      newWorst = numberOfMoves;
    }

    return {
      ...record,
      bestScore: newBest,
      worstScore: newWorst,
    };
  });
}

export function updateStatistics() {
  const statistics = getStatistics();
  const records = updateRecords();

  const newStats = {
    ...statistics,
    gamesPlayed: statistics.gamesPlayed + 1,
    records,
  };
  saveStatistics(newStats);
}
