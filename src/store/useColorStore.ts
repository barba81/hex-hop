import { ColorEntity, ColorFormat } from '@/model/color';
import { create } from 'zustand';

const defaultInputColor = "#3b82f6";

interface ColorState {
  colors: ColorEntity[];
  validColor: string;
  inputFormat: ColorFormat;
  inputColor: string;
  isColorValid: boolean;
  setFormat: (colorFormat: ColorFormat) => void;
  setIsColorValid: (colorFormat: boolean) => void;
  setLastValidColor: (color: string) => void;
  setInputColor: (color: string) => void;
  addColor: (color: ColorEntity) => void;
  deleteAll: () => void;
  deleteById: (id: number) => void;
  addAllColor: (color: ColorEntity[]) => void;
  updateColorInState: (updatedColor: ColorEntity) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  inputFormat: "#",
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  setFormat: (format) => set({ inputFormat: format }),
  setLastValidColor: (newColor) => set({ validColor: newColor }),
  setIsColorValid: (isColorValid) => set({ isColorValid }),
  setInputColor: (newColor) => set({ inputColor: newColor }),
  addAllColor: (newColor) => set({ colors: newColor }),
  deleteAll: () => set({ colors: [] }),
  deleteById: (id) => set((state) => ({ colors: state.colors.filter(x => x.id !== id) })),
  addColor: (newColor) =>
    set((state) => ({
      colors: [newColor, ...state.colors]
    })),
  updateColorInState: (updatedColor) =>
    set((state) => ({
      colors: state.colors.map((c) =>
        c.id === updatedColor.id ? updatedColor : c
      ),
    })),
}));
