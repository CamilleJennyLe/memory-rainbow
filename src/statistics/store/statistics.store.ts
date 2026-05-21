import { create } from "zustand";
import { getStatistics, saveStatistics } from "../../storage/statistics";
import { getBestScore, updatedStatistics } from "../statistics";

interface StatisticsStore {
  record: number | null;
  updateStatistics: () => void;
}

export const useRecordStore = create<StatisticsStore>((set) => ({
  record: getBestScore(getStatistics()),
  updateStatistics: () =>
    set(() => {
      const newStats = updatedStatistics();
      const record = getBestScore(newStats);
      saveStatistics(newStats);
      return {
        record,
      };
    }),
}));
