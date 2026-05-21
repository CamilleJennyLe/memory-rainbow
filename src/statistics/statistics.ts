import { useBoardStore } from "../board/board-store/board.store";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";
import { getStatistics } from "../storage/statistics";
import type { Score, Statistics } from "./statistics.type";

function updateRecords(statistics: Statistics): Score[] {
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

export function updatedStatistics(): Statistics {
  const statistics = getStatistics();
  const scores = updateRecords(statistics);

  const newStats = {
    ...statistics,
    gamesPlayed: statistics.gamesPlayed + 1,
    scores,
  };
  return newStats;
}

export function getBestScore(stats: Statistics | undefined): number | null {
  if (!stats?.scores) {
    return null;
  }
  const { difficulty } = useDeckStore.getState();
  return (
    stats.scores.find((score) => score.difficulty === difficulty)?.bestScore ??
    null
  );
}
