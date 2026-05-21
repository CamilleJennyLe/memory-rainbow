import { useBoardStore } from "../board/board-store/board.store";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";
import { getStatistics, saveStatistics } from "../storage/statistics";
import type { Score, Statistics } from "./statistics.type";

function updateScores(statistics: Statistics): Score[] {
  const { scores } = statistics;
  const { difficulty } = useDeckStore.getState();
  const { numberOfMoves } = useBoardStore.getState();
  const currentRecord = scores.find(
    (record) => record.difficulty === difficulty,
  );

  if (!currentRecord) {
    return [
      ...scores,
      { difficulty, bestScore: numberOfMoves, worstScore: numberOfMoves },
    ];
  }

  return scores.map((record) => {
    if (record.difficulty !== difficulty) {
      return record;
    }

    const newBest =
      record.bestScore === undefined
        ? numberOfMoves
        : Math.min(record.bestScore, numberOfMoves);
    const newWorst =
      record.worstScore === undefined
        ? numberOfMoves
        : Math.max(record.worstScore, numberOfMoves);

    return {
      ...record,
      bestScore: newBest,
      worstScore: newWorst,
    };
  });
}

export function updateStoredStatistics() {
  const statistics = getStatistics();
  const scores = updateScores(statistics);

  const newStats = {
    ...statistics,
    gamesPlayed: statistics.gamesPlayed + 1,
    scores,
  };
  saveStatistics(newStats);
}

export function getBestScore(): number | null {
  const { difficulty } = useDeckStore.getState();
  return (
    getStatistics().scores?.find((s) => s.difficulty === difficulty)
      ?.bestScore ?? null
  );
}
