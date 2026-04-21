import { create } from 'zustand';

interface ColorState {
    colors: [],
    currentColor: string;
    setColor: (color: string) => void;
    addColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  currentColor: "#3b82f6", 
  
  setColor: (newColor) => set({ currentColor: newColor }),

  addColor: (newColor) => 
    set((state) => ({ 
      colors: [...state.colors, newColor] 
    })),
}));