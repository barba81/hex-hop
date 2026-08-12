import { create } from 'zustand';

export type PagesTypes = 'color-list'
  | 'gradient-creator'
  | 'color-contrast'
  | 'import-export'
  | 'settings'
  | 'palette-generator';

interface AppState {
  activePage: PagesTypes;
  setActivePage: (activePage: PagesTypes) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activePage: 'color-list',

  setActivePage: (activePage) => {
    set({ activePage })
  },
}));