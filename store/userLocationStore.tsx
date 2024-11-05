import { create } from "zustand";

export const userStore = create ((set)=>({
    userLocation:null,
    setUserLocation:(details) => set(()=> ({userLocation: details})),
}))