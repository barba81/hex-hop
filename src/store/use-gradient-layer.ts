import { create } from "zustand";

interface GradientLayerStore {
  actions: GradientLayerAction;
}

interface GradientLayerAction {
}

export const useGradientLayerStore = create<GradientLayerStore>((set) => ({
  actions: {}
}));

