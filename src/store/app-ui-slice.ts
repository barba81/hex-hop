import { StateCreator } from "zustand";


type ImmerStateCreator<T> = StateCreator<
  T,
  [["zustand/immer", never], never],
  [],
  T
>;

export interface AppStatusSlice {
  appInFocus: boolean;
  unSavedState: boolean;
  setAppInFocus: (focus: boolean) => void;
  setleUnSavedApp: (saved: boolean) => void;
}

export const appStateSlice: ImmerStateCreator<AppStatusSlice> = (set) => ({
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
});
