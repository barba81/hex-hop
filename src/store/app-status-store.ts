import { create } from "zustand";

export interface AppStatusSlice {
  appInFocus: boolean;
  unSavedStatus: boolean;
  setAppInFocus: (focus: boolean) => void;
  setUnSavedStatus: (saved: boolean) => void;
}

export const useAppInfoStore =  create<AppStatusSlice>()((set) => ({
  appInFocus: false,
  unSavedStatus: false,
  setAppInFocus: (focus) =>
    set((state) => {
      return {...state, appInFocus: focus };
    }),
  setUnSavedStatus: (saved) =>
    set((state) => {
      return {...state, unSavedStatus: saved };
    }),
}));
