import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStatistics } from "./statistics";

describe("getStatistics", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns defaults when nothing is stored", () => {
    expect(getStatistics()).toEqual({ gamesPlayed: 0, scores: [] });
  });

  it("normalizes legacy data without scores", () => {
    localStorage.setItem("statistics", JSON.stringify({ gamesPlayed: 5 }));

    expect(getStatistics()).toEqual({ gamesPlayed: 5, scores: [] });
  });

  it("normalizes invalid scores field", () => {
    localStorage.setItem(
      "statistics",
      JSON.stringify({ gamesPlayed: 3, scores: null }),
    );

    expect(getStatistics()).toEqual({ gamesPlayed: 3, scores: [] });
  });

  it("returns stored statistics when valid", () => {
    const stats = {
      gamesPlayed: 2,
      scores: [{ difficulty: "level1", bestScore: 10, worstScore: 20 }],
    };
    localStorage.setItem("statistics", JSON.stringify(stats));

    expect(getStatistics()).toEqual(stats);
  });

  it("returns defaults on parse error", () => {
    localStorage.setItem("statistics", "not-json");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(getStatistics()).toEqual({ gamesPlayed: 0, scores: [] });

    errorSpy.mockRestore();
  });
});
