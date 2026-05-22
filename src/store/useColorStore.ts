import { create } from 'zustand';

const defaultInputColor = "#3b82f6";

interface ColorState {
  isDark: boolean;
  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  setIsDark: (isDark: boolean) => void;
  setIsColorValid: (colorFormat: boolean) => void;
  setLastValidColor: (color: string) => void;
  setInputColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  isDark: false,
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  setIsDark:(isDark) => set({ isDark: isDark }),
  setLastValidColor: (newColor) => set({ validColor: newColor }),
  setIsColorValid: (isColorValid) => set({ isColorValid }),
  setInputColor: (newColor) => set({ inputColor: newColor }),
}));
