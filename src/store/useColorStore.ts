import { ColorEntity } from '@/model/color';
import { Color } from '@tauri-apps/api/webview';
import { create } from 'zustand';

interface ColorState {
  colors: ColorEntity[]; 
  currentlyInsertedColor: string;
  setColor: (color: string) => void;
  addColor: (color: ColorEntity) => void;
  addAllColor: (color: ColorEntity[]) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  currentlyInsertedColor: "#3b82f6", 
  
  setColor: (newColor) => set({ currentlyInsertedColor: newColor }),
  addAllColor: (newColor) => set({ colors: newColor  }),

  addColor: (newColor) => 
    set((state) => ({ 
      colors : [...state.colors, newColor] 
    })),
}));