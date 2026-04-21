import { create } from 'zustand';

interface ColorState {
  currentColor: string;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  currentColor: "#3b82f6", 
  setColor: (newColor) => set({ currentColor: newColor }),
}));