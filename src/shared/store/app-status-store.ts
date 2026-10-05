import { create } from "zustand";

type Theme = "dark" | "light" | "system";

export interface AppStatusSlice {
  appInFocus: boolean;
  unSavedStatus: boolean;
  theme: Theme,
  setAppInFocus: (focus: boolean) => void;
  setUnSavedStatus: (saved: boolean) => void;
  setTheme: (theme: Theme) => void;
}

export const useAppInfoStore = create<AppStatusSlice>()((set) => ({
  appInFocus: false,
  unSavedStatus: false,
  theme: 'dark',
  setAppInFocus: (focus) =>
    set((state) => {
      return { ...state, appInFocus: focus };
    }),
  setUnSavedStatus: (saved) =>
    set((state) => {
      return { ...state, unSavedStatus: saved };
    }),
  setTheme: (theme) =>
    set((state) => {
      return { ...state, theme }
    })
}));
