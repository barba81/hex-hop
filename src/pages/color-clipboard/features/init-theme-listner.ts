import { useAppStore } from "@/store/use-theme-store";

/**
 * Initializes and monitors the system color-scheme preference, updating the application dark-mode state when it changes.
 */
export function initThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const initialDark = mediaQuery.matches;
  useAppStore.getState().setIsDark(initialDark);

  mediaQuery.addEventListener('change', (e) => {
    useAppStore.getState().setIsDark(e.matches);
  });
}

// 