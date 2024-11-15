import { create } from 'zustand';

export const destStore = create((set) => ({
    destDetails: null,
    showDestDetails:false,
    navigationStatus:false,
    setShowDestDetails:(val) => set(()=> ({showDestDetails:val})),
    setDest: (newDest) => set(() => ({ destDetails: newDest, showDestDetails:true,navigationStatus:false })),
    clearDest:()=>set(()=> ({destDetails:null, showDestDetails:false})),
    setNavigationStatus:(val) => set(()=> ({navigationStatus:val,showDestDetails:false})),
}));
