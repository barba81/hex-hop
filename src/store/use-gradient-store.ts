import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";

interface GradientStore {
  gradients: GradientEntity[];
  selectedGradientId: number | null;
  actions: GradientAction;
}

interface GradientAction {
  setActiveGradient: (id: number) => void;
  setNewActiveGradient: () => void;
  addGradient: (block: GradientEntity) => void;
  setGradient: (blocks: GradientEntity[]) => void;
  removeGradient: (id: number) => void;
}
 
export const useGradientStore = create<GradientStore>((set) => ({
  gradients: [],
  selectedGradientId: null,
  actions: {
    setActiveGradient: (id: number) => {
      set(() => ({  selectedGradientId: id }));
    },
    setNewActiveGradient: () => {
      set((state) => ({  selectedGradientId: state?.gradients[0]?.id ?? null }));
    },
    setGradient: (blocks: GradientEntity[]) => {
      set(() => ({ gradients: [...blocks] }));
    },
    addGradient: (entity: GradientEntity): void => {
      set((state) => ({ gradients: [...state.gradients, entity] }));
    },

    removeGradient: (id: number) : void => {
      set((state) => ({ gradients: state.gradients.filter(x=>x.id !== id) }));
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
export const useSelectedGradientId = () => useGradientStore((state) => state.selectedGradientId);
export const useGradientActions = () => useGradientStore((state) => state.actions);
export const useGradients = () => useGradientStore((state) => state.gradients);
export const useGradientStoreHasElements = () => useGradientStore((state) => state.gradients.length > 0);
