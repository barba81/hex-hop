import { ColorEntity } from '@/model/color';
import { create } from 'zustand';

interface ColorState {
  colors: ColorEntity[]; 
  currentlyInsertedColor: string;
  setColor: (color: string) => void;
  addColor: (color: ColorEntity) => void;
  deleteAll: () => void;
  deleteById: (id: number) => void;
  addAllColor: (color: ColorEntity[]) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  currentlyInsertedColor: "#3b82f6", 
  
  setColor: (newColor) => set({ currentlyInsertedColor: newColor }),
  addAllColor: (newColor) => set({ colors: newColor  }),
  deleteAll: () => set({colors: []}),
  deleteById: (id) =>set((state)=>({colors: state.colors.filter(x=>x.id!==id)})),
  addColor: (newColor) => 
    set((state) => ({ 
      colors : [newColor, ...state.colors] 
    })),
}));