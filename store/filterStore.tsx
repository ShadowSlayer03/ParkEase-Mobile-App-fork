import { create } from "zustand";

interface FilterStore {
  showOnlyFreeSpots: boolean;
  distanceRange: number;
  setShowOnlyFreeSpots: (val: boolean) => void;
  setDistanceRange: (dist: number) => void;
  clearAll: () => void;
}

export const filterStore = create<FilterStore>((set) => ({
  showOnlyFreeSpots: false,
  distanceRange: 20,
  setShowOnlyFreeSpots: (val) => set(() => ({ showOnlyFreeSpots: val })),
  setDistanceRange: (dist) => set(() => ({ distanceRange: dist })),
  clearAll: () =>
    set(() => ({
      showOnlyFreeSpots: false,
      distanceRange: 20,
    })),
}));
