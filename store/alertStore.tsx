import { create } from "zustand";

interface AlertStore {
  showAlert: boolean;
  statusCode: number | null;
  message: string;
  setShowAlert: () => void;
  setStatusCode: (code: number) => void;
  setMsg: (msg: string) => void;
  clearAll: () => void;
}

export const alertStore = create<AlertStore>((set) => ({
  showAlert: false,
  statusCode: null,
  message: "",
  setShowAlert: () => set({ showAlert: true }),
  setStatusCode: (code: number) => set({ statusCode: code }),
  setMsg: (msg: string) => set({ message: msg }),
  clearAll: () => set({ showAlert: false, statusCode: null, message: "" }),
}));
