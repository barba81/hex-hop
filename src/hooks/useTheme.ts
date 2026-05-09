import { useAppStore } from "@/store/useThemeStore";

export function initThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const initialDark = mediaQuery.matches;
  useAppStore.getState().setIsDark(initialDark);

  mediaQuery.addEventListener('change', (e) => {
    useAppStore.getState().setIsDark(e.matches);
  });
}