import { create } from "zustand";

export const userLocationStore = create ((set)=>({
    userLocation:null,
    setUserLocation:(details) => set(()=> ({userLocation: details})),
}))