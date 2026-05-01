import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // Initialize based on system preference
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
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