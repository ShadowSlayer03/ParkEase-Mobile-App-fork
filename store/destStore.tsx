import destTypes from "@/types/destTypes";
import { create } from "zustand";

interface DestStoreState {
  destDetails: destTypes | null;
  showDestDetails: boolean;
  navigationStatus: boolean;
  setShowDestDetails: (val: boolean) => void;
  setDest: (newDest: destTypes) => void;
  clearDest: () => void;
  setNavigationStatus: (val: boolean) => void;
}

export const destStore = create<DestStoreState>((set) => ({
  destDetails: null,
  showDestDetails: false,
  navigationStatus: false,
  setShowDestDetails: (val) => set(() => ({ showDestDetails: val })),
  setDest: (newDest) =>
    set(() => ({
      destDetails: newDest,
      showDestDetails: true,
      navigationStatus: false,
    })),
  clearDest: () => set(() => ({ destDetails: null, showDestDetails: false })),
  setNavigationStatus: (val) =>
    set(() => ({ navigationStatus: val, showDestDetails: false })),
}));
