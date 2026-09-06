import type { GradientEntity, GradientLayerEntity, GradientStopEntity } from "@/infrastructure/models/entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface GradientStore {
  expandedLayers: Record<string, boolean>;
  gradients: GradientEntity[];
  selectedGradientId: number | null;
}

interface GradientAction {
  addLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  deleteGradientLayer: (gradientId: number, gradientLayerId: number) => void;
  toggleLayerExpanded: (layerId: number) => void;
}

export const gradientLayerStore = immer((set) => ({
  expandedLayers: {},
  gradients: [],
  selectedGradientId: null,
  addLayerToSelected: (gradientId: number, layer: GradientLayerEntity) =>
    set((state) => {
      const gradient = state.gradients.find(id => id.id = gradientId);
      if (!gradient) return;
      gradient?.layers.push(layer);
    }),

  // updateLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  // updateGradientStop: (gradientId: number, layerId: number, gradientStop: GradientStopEntity) => void;

  // DELETE -----------------------------------------------------------------------

  deleteGradientLayer: (gradientId: number, gradientLayerId: number) =>
    set((state) => {
      const gradientIndex = state.gradients.findIndex((x) => x.id === gradientId);
      if (gradientIndex === -1) return;
      const gradientLayerIndex = state.gradients[gradientIndex].layers.findIndex((x) => x.id === gradientLayerId);
      if (gradientLayerIndex !== -1) {
        state.gradients[gradientIndex].layers.splice(gradientLayerIndex, 1);
      }
    }),


  // UI -----------------------------------------------------------------------

  toggleLayerExpanded: (layerId: number) =>
    set((state) => {
      state.expandedLayers[layerId] = !state.expandedLayers[layerId];
    }),

}));

