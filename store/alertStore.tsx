import { create } from "zustand";

export const alertStore = create ((set) => ({
    showAlert:false,
    statusCode:null,
    message:'',
    setShowAlert:()=> set ({showAlert:true}),
    setStatusCode:(code)=> set({statusCode:code}),
    setMsg:(msg)=> set({message:msg}),
    clearAll:()=> set({showAlert:false,
                        statusCode:null,
                        message:''})
}))