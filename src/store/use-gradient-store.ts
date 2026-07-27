import { GradientEntity, GradientLayerEntity, GradientStopEntity } from "@/infrastructure/entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface GradientStore {
  expandedLayers: Record<string, boolean>;
  gradients: GradientEntity[];
  selectedGradientId: number | null;
}

interface GradientAction {
  // CREATE -----------------------------------------------------------------------

  addGradient: (gradient: GradientEntity) => void;
  addLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  addGradientStop: (gradientId: number, layerId: number, gradientStop: GradientStopEntity) => void;

  // UPDATE   -----------------------------------------------------------------------

  updateGradient: (gradient: GradientEntity) => void;
  // updateLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  // updateGradientStop: (gradientId: number, layerId: number, gradientStop: GradientStopEntity) => void;

  // DELETE -----------------------------------------------------------------------

  deleteGradient: (gradientId: number) => void;
  deleteGradientLayer: (gradientId: number, gradientLayerId: number) => void;
  deleteGradientStop: (gradientId: number, gradientLayerId: number, stopId: number) => void;

  // UI -----------------------------------------------------------------------
  toggleLayerExpanded: (layerId: number) => void;
}

export const useGradientStore = create<GradientStore & GradientAction>()(immer((set) => ({
  expandedLayers: {},
  gradients: [],
  selectedGradientId: null,

  // CREATE -----------------------------------------------------------------------

  addGradient: (gradient: GradientEntity) =>
    set((state) => {
      state.gradients.push(gradient);
    }),
  addLayerToSelected: (gradientId: number, layer: GradientLayerEntity) =>
    set((state) => {
      let gradient = state.gradients.find(id => id.id = gradientId);
      if (!gradient) return;
      gradient?.layers.push(layer);
    }),
  addGradientStop: (gradientId: number, layerId: number, stop: GradientStopEntity) =>
    set((state) => {
      let gradient = state.gradients.find(id => id.id === gradientId);
      if (!gradient) return;
      let layer = gradient.layers.find(x => x.id === layerId);
      if (!layer) return;
      layer.stops.push(stop);
    }),

  // UPDATE   -----------------------------------------------------------------------

  updateGradient: (gradient: GradientEntity) =>
    set((state) => {
      const index = state.gradients.findIndex((g) => g.id === gradient.id);
      if (index === -1) return;
      state.gradients[index] = gradient;
    }),
  // updateLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  // updateGradientStop: (gradientId: number, layerId: number, gradientStop: GradientStopEntity) => void;


  // DELETE -----------------------------------------------------------------------

  deleteGradient: (gradientId: number) =>
    set((state) => {
      const index = state.gradients.findIndex((x) => x.id === gradientId);
      if (index !== -1) {
        state.gradients.splice(index, 1);
      }
    }),

  deleteGradientLayer: (gradientId: number, gradientLayerId: number) =>
    set((state) => {
      const gradientIndex = state.gradients.findIndex((x) => x.id === gradientId);
      if (gradientIndex === -1) return;
      const gradientLayerIndex = state.gradients[gradientIndex].layers.findIndex((x) => x.id === gradientLayerId);
      if (gradientLayerIndex !== -1) {
        state.gradients[gradientIndex].layers.splice(gradientLayerIndex, 1);
      }
    }),

  deleteGradientStop: (gradientId: number, gradientLayerId: number, stopId: number) =>
    set((state) => {
      const gradientIndex = state.gradients.findIndex((x) => x.id === gradientId);
      if (gradientIndex === -1) return;
      const gradientLayerIndex = state.gradients[gradientIndex].layers.findIndex((x) => x.id === gradientLayerId);
      if (gradientLayerIndex === -1) return;
      const gradientStopIndex = state.gradients[gradientIndex].layers[gradientLayerIndex].stops.findIndex((x) => x.id === stopId);
      if (gradientStopIndex !== -1) {
        state.gradients[gradientIndex].layers[gradientLayerIndex].stops.splice(gradientStopIndex, 1);
      }
    }),

  // UI -----------------------------------------------------------------------

  toggleLayerExpanded: (layerId: number) =>
    set((state) => {
      state.expandedLayers[layerId] = !state.expandedLayers[layerId];
    }),

})));


export const useGradientStoreHasElements = () => useGradientStore((state) => state.gradients.length > 0);
export const useGradientStoreSelectedGradient = () => useGradientStore((state) => state.gradients[0]);