import { create } from 'zustand';

interface ColorState {
  color: string;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  color: "#3b82f6", // Initial color
  setColor: (newColor) => set({ color: newColor }),
}));