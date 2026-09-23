import { create } from "zustand";


export interface AppStatusSlice {
  appInFocus: boolean;
  unSavedState: boolean;
  setAppInFocus: (focus: boolean) => void;
  setleUnSavedApp: (saved: boolean) => void;
}


export const useAppInfoStore =  create<AppStatusSlice>()((set) => ({
  appInFocus: false,
  unSavedState: false,
  setAppInFocus: (focus) =>
    set((state) => {
      return {...state, appInFocus: focus };
    }),
  setleUnSavedApp: (saved) =>
    set((state) => {
      return {...state, unSavedState: saved };
    }),
}));
