import { LocationObjectCoords } from "expo-location";
import { create } from "zustand";

interface UserLocationState {
  userLocation: LocationObjectCoords | null;
  setUserLocation: (details: LocationObjectCoords) => void;
}

export const userLocationStore = create<UserLocationState>((set) => ({
  userLocation: null,
  setUserLocation: (details) => set(() => ({ userLocation: details })),
}));
