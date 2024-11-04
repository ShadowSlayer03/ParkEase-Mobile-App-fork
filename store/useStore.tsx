import { create } from 'zustand';

export const destStore = create((set) => ({
    destDetails: null,
    showDestDetails:false,
    setDest: (newDest) => set(() => ({ destDetails: newDest, showDestDetails:true })),
    clearDest:()=>set(()=> ({destDetails:null, showDestDetails:false}))
}));
