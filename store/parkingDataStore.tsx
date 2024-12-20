import { create } from "zustand";

interface ParkingDataStore {
  parkingLotName: string;
  spotsInfo: number[];
  filled: number;
  total: number;
  setParkingLotName: (name: string) => void;
  setLotsInfo: (data: { info: number[]; filled: number; total: number }) => void;
}

export const parkingDataStore = create<ParkingDataStore>((set) => ({
  parkingLotName: "Default Parking Lot",
  spotsInfo: [],
  filled: 0,
  total: 0,
  setParkingLotName: (name) => set(() => ({ parkingLotName: name })),
  setLotsInfo: (data) =>
    set(() => ({
      spotsInfo: data.info,
      filled: data.filled,
      total: data.total,
    })),
}));
