import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";

interface GradientStore {
  gradients: GradientEntity[];
  selectedGradientId: number | null;
  actions: GradientAction;
}

interface GradientAction {
  addGradient: (block: GradientEntity) => void;
  setGradient: (blocks: GradientEntity[]) => void;

}

export const useGradientStore = create<GradientStore>((set) => ({
  gradients: [],
  selectedGradientId: null,
  actions: {
    setGradient: (blocks: GradientEntity[]) => {
      set(() => ({ gradients: [...blocks] }));
    },
    addGradient: (entity: GradientEntity): void => {
      set((state) => ({ gradients: [...state.gradients, entity] }));
    },
  }
}));

export const useSelectedGradient = () => {
  return useGradientStore((state) =>
    state.selectedGradientId !== null
      ? state.gradients.find((g) => g.id === state.selectedGradientId) || null
      : null
  );
};
export const useGradientActions = () => useGradientStore((state) => state.actions);
export const useGradients = () => useGradientStore((state) => state.gradients);
