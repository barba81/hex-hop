import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";

interface GradientStore {
    gradients: GradientEntity[];
    selectedGradientId: number | null;
    actions: GradientAction;

}

interface GradientAction {

}

const useGradientStore = create<GradientStore>((set) => ({
    gradients: [],
    selectedGradientId: null,
    actions: {}
}));

export const useSelectedGradient = () => {
  return useGradientStore((state) =>
    state.selectedGradientId !== null
      ? state.gradients.find((g) => g.id === state.selectedGradientId) || null
      : null
  );
};
export const useGradientActions = () => useGradientStore((state) => state.actions);