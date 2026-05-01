import { useThemeStore } from "@/store/useThemeStore";

export function initThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const initialDark = mediaQuery.matches;
  useThemeStore.getState().setIsDark(initialDark);

  mediaQuery.addEventListener('change', (e) => {
    useThemeStore.getState().setIsDark(e.matches);
  });
}