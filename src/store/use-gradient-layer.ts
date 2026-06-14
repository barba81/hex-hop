import { GradientLayer } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";

interface GradientLayerStore {
  layers: GradientLayer[];
  actions: GradientLayerAction;
}

interface GradientLayerAction {
  setGradient: (blocks: GradientLayer[]) => void;
  addGradientLayer: (layer: GradientLayer) => void;
}

export const useGradientLayerStore = create<GradientLayerStore>((set) => ({
  layers: [],
  actions: {
    setGradient: (blocks: GradientLayer[]) => {
      set(() => ({ layers: [...blocks] }));
    },
    addGradientLayer: (layer: GradientLayer) => {
      set((state) => ({ layers: [...state.layers, layer] }))
    }
  }
}));

