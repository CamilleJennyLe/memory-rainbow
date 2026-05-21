import { create } from "zustand";
import { getBestScore, updateStoredStatistics } from "../statistics";

interface StatisticsStore {
  record: number | null;
  updateStatistics: () => void;
}

export const useRecordStore = create<StatisticsStore>((set) => ({
  record: getBestScore(),
  updateStatistics: () =>
    set(() => {
      updateStoredStatistics();
      return {
        record: getBestScore(),
      };
    }),
}));
