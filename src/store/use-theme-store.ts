import { create } from 'zustand';

export type PagesTypes = 'color-list' | 'gradient-creator' | 'color-contrast' | 'import-export' | 'settings' | 'palette-generator';

interface AppState {
  activePage: PagesTypes;
  isDark: boolean;
  setActivePage: (activePage: PagesTypes) => void;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activePage: 'color-list',
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,

  setActivePage : (activePage) => {
    set({activePage})
  },

  setIsDark: (isDark) => {
    set({ isDark });
    document.documentElement.classList.toggle('dark', isDark);
  },
  
  toggleTheme: () => {
    set((state) => {
      const next = !state.isDark;
      document.documentElement.classList.toggle('dark', next);
      return { isDark: next };
    });
  },
}));