import { create } from "zustand";

interface Ride {
  destination: string;
  time: string;
}

interface ActivityStore {
  previousRides: Ride[];
  addRide: (ride: Ride) => void;
  clearRides: () => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  previousRides: [],
  
  addRide: (ride) =>
    set((state) => ({ previousRides: [ride, ...state.previousRides] })),
  
  clearRides: () => set({ previousRides: [] }),
}));
