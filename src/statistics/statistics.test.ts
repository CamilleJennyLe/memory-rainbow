import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBoardStore } from "../board/board-store/board.store";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";
import { levelOne, levelTwo } from "../card-deck/difficulty";
import * as statisticsStorage from "../storage/statistics";
import { updateStatistics } from "./statistics";
import type { Statistics } from "./statistics.type";

vi.mock("../storage/statistics", () => ({
  getStatistics: vi.fn(),
  saveStatistics: vi.fn(),
}));

const mockGetStatistics = vi.mocked(statisticsStorage.getStatistics);
const mockSaveStatistics = vi.mocked(statisticsStorage.saveStatistics);

const baseStatistics: Statistics = {
  gamesPlayed: 3,
  records: [
    { difficulty: levelOne, bestScore: 10, worstScore: 30 },
    { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
  ],
};

function getSavedStatistics(): Statistics {
  return mockSaveStatistics.mock.calls[0][0];
}

describe("updateStatistics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetStatistics.mockReturnValue(baseStatistics);
    useDeckStore.setState({ difficulty: levelOne });
    useBoardStore.setState({ numberOfMoves: 0 });
  });

  it("only updates the record for the current difficulty", () => {
    useBoardStore.setState({ numberOfMoves: 5 });

    updateStatistics();

    const saved = getSavedStatistics();
    expect(saved.records).toEqual([
      { difficulty: levelOne, bestScore: 5, worstScore: 30 },
      { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
    ]);
  });

  it("updates best when moves are lower than the previous best", () => {
    useBoardStore.setState({ numberOfMoves: 8 });

    updateStatistics();

    const saved = getSavedStatistics();
    expect(saved.records[0]).toEqual({
      difficulty: levelOne,
      bestScore: 8,
      worstScore: 30,
    });
  });

  it("updates worst when moves are higher than the previous worst", () => {
    useBoardStore.setState({ numberOfMoves: 35 });

    updateStatistics();

    const saved = getSavedStatistics();
    expect(saved.records[0]).toEqual({
      difficulty: levelOne,
      bestScore: 10,
      worstScore: 35,
    });
  });

  it("does not update best or worst when moves are between them", () => {
    useBoardStore.setState({ numberOfMoves: 20 });

    updateStatistics();

    const saved = getSavedStatistics();
    expect(saved.records[0]).toEqual({
      difficulty: levelOne,
      bestScore: 10,
      worstScore: 30,
    });
  });

  it("increments games played", () => {
    useBoardStore.setState({ numberOfMoves: 20 });

    updateStatistics();

    expect(getSavedStatistics().gamesPlayed).toBe(4);
  });
});
