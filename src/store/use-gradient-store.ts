import { GradientEntity, GradientLayer, GradientStop } from "@/features/infrastructure/entity/gradient.entity";
import { create } from "zustand";

interface GradientStore {
  expandedLayers: Record<string, boolean>;
  gradients: GradientEntity[];
  selectedGradientId: number | null;
  actions: GradientAction;
}

interface GradientAction {
  toggleLayerExpanded: (layerId: number) => void;

  addGradient: (block: GradientEntity) => void;
  setGradient: (blocks: GradientEntity[]) => void;
  removeGradient: (id: number) => void;
  setActiveGradient: (id: number) => void;

  addLayerToSelected: ( layer: GradientLayer) => void;
  addGradientStop: ( layerId: number, gradientStop: GradientStop) => void;
}

export const useGradientStore = create<GradientStore>((set) => ({
  expandedLayers: {},
  gradients: [],
  selectedGradientId: null,
  actions: {
    toggleLayerExpanded: (layerId) => set((state) => ({
      expandedLayers: {
        ...state.expandedLayers,
        [layerId]: !state.expandedLayers[layerId]
      }
    })),
    setActiveGradient: (id: number) => {
      set(() => ({ selectedGradientId: id }));
    },
    setGradient: (blocks: GradientEntity[]) => {
      set(() => ({ gradients: [...blocks] }));
    },
    addGradient: (entity: GradientEntity): void => {
      set((state) => ({ gradients: [...state.gradients, entity] }));
    },

    removeGradient: (id: number): void => {
      set((state) => ({ gradients: state.gradients.filter(x => x.id !== id) }));
    },
    addLayerToSelected: (layer: GradientLayer) => set((state) => {
      if (!state.selectedGradientId) return {};

      return {
        gradients: state.gradients.map((g) => g.id === state.selectedGradientId
          ? { ...g, layers: [...g.layers, layer] }
          : g
        )
      };
    }),

    addGradientStop: (layerId: number, stop: GradientStop) => set((state) => {
      return {
        gradients: state.gradients.map((gradient)=>{
          if (gradient.id !== state.selectedGradientId) return gradient;

          return {
            ...gradient,
            layers: gradient.layers.map((layer)=>{
              if (layer.id !== layerId) return layer;

              return {
                ...layer,
                stops: [...(layer.stops || []), stop]
              }
            })
          }
        })
      }
    })
  }
}));

export const useSelectedGradient = () => {
  return useGradientStore((state) =>
    state.selectedGradientId !== null
      ? state.gradients.find((g) => g.id === state.selectedGradientId) || null
      : null
  );
};

export const useGradientStoreHasElements = () => useGradientStore((state) => state.gradients.length > 0);
export const useSelectedGradientId = () => useGradientStore((state) => state.selectedGradientId);
export const useGradientActions = () => useGradientStore((state) => state.actions);
export const useGradients = () => useGradientStore((state) => state.gradients);

export const useSelectedLayers = () => useGradientStore((state) => {
  const currentGradient = state.gradients.find((g) => g.id === state.selectedGradientId);
  return currentGradient ? currentGradient.layers : [];
});

export const useGradientStops = (layerId: number) => useGradientStore((state) => {
  const currentGradient = state.gradients.find((g) => g.id === state.selectedGradientId);
  if (!currentGradient) return []
   const currentLayer = currentGradient.layers.find((l) => l.id === layerId);
  return currentLayer ? currentLayer.stops : [];
});