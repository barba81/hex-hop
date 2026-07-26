import { create } from 'zustand';

const defaultInputColor = "#3b82f6";

interface ColorState {
  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
  setIsColorValid: (colorFormat: boolean) => void;
  setLastValidColor: (color: string) => void;
  setInputColor: (color: string) => void;
  setFormat: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",
  setLastValidColor: (newColor) => set({ validColor: newColor }),
  setIsColorValid: (isColorValid) => set({ isColorValid }),
  setInputColor: (newColor) => set({ inputColor: newColor }),
  setFormat: (newColor) => set({ colorFormat: newColor }),
}));
