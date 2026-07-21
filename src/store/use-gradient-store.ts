import { GradientEntity, GradientLayerEntity, GradientStopEntity } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface GradientStore {
  expandedLayers: Record<string, boolean>;
  gradients: GradientEntity[];
  selectedGradientId: number | null;
}

interface GradientAction {
  
  addGradient: (gradient: GradientEntity) => void;
  // setGradient: (blocks: GradientEntity[]) => void;
  // removeGradient: (id: number) => void;
  // setActiveGradient: (id: number) => void;
  
  // addLayerToSelected: ( layer: GradientLayerEntity) => void;
  // addGradientStop: ( layerId: number, gradientStop: GradientStopEntity) => void;
  toggleLayerExpanded: (layerId: number) => void;
}

export const useGradientStore = create<GradientStore & GradientAction>()(immer((set) => ({
  expandedLayers : {},
  gradients: [],
  selectedGradientId: null,
    toggleLayerExpanded: (layerId: number) =>
      set((state) => {
        state.expandedLayers[layerId] = !state.expandedLayers[layerId];
      }),
    addGradient: (gradient: GradientEntity) =>
      set((state) => {
        state.gradients.push(gradient);
      }),
})));


export const useGradientStoreHasElements = () => useGradientStore((state) => state.gradients.length > 0);