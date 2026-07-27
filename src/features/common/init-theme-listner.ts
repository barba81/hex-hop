import { useAppStore } from "@/store/use-theme-store";

export function initThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const initialDark = mediaQuery.matches;
  useAppStore.getState().setIsDark(initialDark);

  mediaQuery.addEventListener('change', (e) => {
    useAppStore.getState().setIsDark(e.matches);
  });
}

// 