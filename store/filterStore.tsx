import { create } from "zustand";

export const filterStore = create((set) => ({
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
      additionalOptions: [],
      distanceRange: 2,
    })),
}));
