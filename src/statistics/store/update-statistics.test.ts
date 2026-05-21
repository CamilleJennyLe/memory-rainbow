import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBoardStore } from "../../board/board-store/board.store";
import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store";
import { levelOne, levelTwo } from "../../card-deck/difficulty";
import * as statisticsStorage from "../../storage/statistics";
import type { Statistics } from "../statistics.type";
import { useRecordStore } from "./statistics.store";

vi.mock("../../storage/statistics", () => ({
  getStatistics: vi.fn(),
  saveStatistics: vi.fn(),
}));

const mockGetStatistics = vi.mocked(statisticsStorage.getStatistics);
const mockSaveStatistics = vi.mocked(statisticsStorage.saveStatistics);

const baseStatistics: Statistics = {
  gamesPlayed: 3,
  scores: [
    { difficulty: levelOne, bestScore: 10, worstScore: 30 },
    { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
  ],
};

let storedStatistics: Statistics = baseStatistics;

describe("updateStatistics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storedStatistics = baseStatistics;
    mockGetStatistics.mockImplementation(() => storedStatistics);
    mockSaveStatistics.mockImplementation((stats) => {
      storedStatistics = stats;
    });
    useDeckStore.setState({ difficulty: levelOne });
    useBoardStore.setState({ numberOfMoves: 0 });
    useRecordStore.setState({ record: null });
  });

  it("only updates the record for the current difficulty", () => {
    useBoardStore.setState({ numberOfMoves: 5 });

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 4,
      scores: [
        { difficulty: levelOne, bestScore: 5, worstScore: 30 },
        { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
      ],
    });
    expect(useRecordStore.getState().record).toBe(5);
  });

  it("updates best when moves are lower than the previous best", () => {
    useBoardStore.setState({ numberOfMoves: 8 });

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 4,
      scores: [
        { difficulty: levelOne, bestScore: 8, worstScore: 30 },
        { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
      ],
    });
    expect(useRecordStore.getState().record).toBe(8);
  });

  it("updates worst when moves are higher than the previous worst", () => {
    useBoardStore.setState({ numberOfMoves: 35 });

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 4,
      scores: [
        { difficulty: levelOne, bestScore: 10, worstScore: 35 },
        { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
      ],
    });
    expect(useRecordStore.getState().record).toBe(10);
  });

  it("does not update best or worst when moves are between them", () => {
    useBoardStore.setState({ numberOfMoves: 20 });

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 4,
      scores: [
        { difficulty: levelOne, bestScore: 10, worstScore: 30 },
        { difficulty: levelTwo, bestScore: 15, worstScore: 40 },
      ],
    });
    expect(useRecordStore.getState().record).toBe(10);
  });

  it("should update best and worst when they are not defined yet", () => {
    useBoardStore.setState({ numberOfMoves: 12 });
    storedStatistics = { gamesPlayed: 0, scores: [] };

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 1,
      scores: [{ difficulty: levelOne, bestScore: 12, worstScore: 12 }],
    });
    expect(useRecordStore.getState().record).toBe(12);
  });

  it("should update best if it is not defined yet", () => {
    useBoardStore.setState({ numberOfMoves: 14 });
    storedStatistics = {
      gamesPlayed: 0,
      scores: [{ difficulty: levelOne, bestScore: undefined, worstScore: 17 }],
    };

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 1,
      scores: [{ difficulty: levelOne, bestScore: 14, worstScore: 17 }],
    });
    expect(useRecordStore.getState().record).toBe(14);
  });
  it("should update worst if it is not defined yet", () => {
    useBoardStore.setState({ numberOfMoves: 25 });
    storedStatistics = {
      gamesPlayed: 0,
      scores: [{ difficulty: levelOne, bestScore: 10, worstScore: undefined }],
    };

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith({
      gamesPlayed: 1,
      scores: [{ difficulty: levelOne, bestScore: 10, worstScore: 25 }],
    });
    expect(useRecordStore.getState().record).toBe(10);
  });

  it("increments games played", () => {
    useBoardStore.setState({ numberOfMoves: 20 });

    useRecordStore.getState().updateStatistics();

    expect(mockSaveStatistics).toHaveBeenCalledWith(
      expect.objectContaining({ gamesPlayed: 4 }),
    );
    expect(useRecordStore.getState().record).toBe(10);
  });
});
