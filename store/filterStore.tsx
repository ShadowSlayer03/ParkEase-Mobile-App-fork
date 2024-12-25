import { create } from "zustand";

interface FilterStore {
  showOnlyFreeSpots: boolean;
  parkingType: number[];
  distanceRange: number;
  setShowOnlyFreeSpots: () => void;
  setParkingType: (type: number[]) => void;
  setDistanceRange: (dist: number) => void;
  clearAll: () => void;
}

export const filterStore = create<FilterStore>((set) => ({
  showOnlyFreeSpots: false,
  parkingType: [0, 1],
  distanceRange: 2,
  setShowOnlyFreeSpots: () =>
    set((state) => ({ showOnlyFreeSpots: !state.showOnlyFreeSpots })),
  setParkingType: (type) => set(() => ({ parkingType: type })),
  setDistanceRange: (dist) => set(() => ({ distanceRange: dist })),
  clearAll: () =>
    set(() => ({
      showOnlyFreeSpots: false,
      parkingType: [0, 1],
      distanceRange: 2,
    })),
}));
