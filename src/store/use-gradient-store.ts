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
  deleteGradient: (gradientId: number) => void;
  // setGradient: (blocks: GradientEntity[]) => void;
  // removeGradient: (id: number) => void;
  // setActiveGradient: (id: number) => void;

  addLayerToSelected: (gradientId: number, layer: GradientLayerEntity) => void;
  addGradientStop: (gradientId: number, layerId: number, gradientStop: GradientStopEntity) => void;
  toggleLayerExpanded: (layerId: number) => void;
}

export const useGradientStore = create<GradientStore & GradientAction>()(immer((set) => ({
  expandedLayers: {},
  gradients: [],
  selectedGradientId: null,
  toggleLayerExpanded: (layerId: number) =>
    set((state) => {
      state.expandedLayers[layerId] = !state.expandedLayers[layerId];
    }),
  deleteGradient: (gradientId: number) =>
    set((state) => {
      const index = state.gradients.findIndex((x) => x.id === gradientId);
      if (index !== -1) {
        state.gradients.splice(index, 1);
      }
    }),
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
})));


export const useGradientStoreHasElements = () => useGradientStore((state) => state.gradients.length > 0);
export const useGradientStoreSelectedGradient = () => useGradientStore((state) => state.gradients[0]);