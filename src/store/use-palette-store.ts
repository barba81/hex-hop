
import { create } from "zustand";

interface PaletteStore {
    extendedPalletsId: Set<number>;
    actions: PaletteStoreActions;
}

interface PaletteStoreActions {
    addExtendedPalletId: (paletteId: number) => void;
    removeExtendedPalletId: (paletteId: number) => void;
}

export const usePaletteStore = create<PaletteStore>((set) => ({
    extendedPalletsId: new Set<number>(),
    actions: {
        addExtendedPalletId: (paletteId: number): void => {
            set((state) => {
               const nextSet = new Set(state.extendedPalletsId);
                nextSet.add(paletteId);
                return { extendedPalletsId: nextSet };
            });
        },
        removeExtendedPalletId: (paletteId: number): void => {
          set((state) => {
                const nextSet = new Set(state.extendedPalletsId);
                nextSet.delete(paletteId);
                return { extendedPalletsId: nextSet };
            });
        },
    }
}));

export const useIsPaletteExtended = (id: number) => 
    usePaletteStore((state) => state.extendedPalletsId.has(id));