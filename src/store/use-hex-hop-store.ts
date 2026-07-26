
import { create } from "zustand";
import { type PaletteEntity } from "@/features/infrastructure/palette.entity";
import { type GradientEntity } from "@/features/infrastructure/entity";
import { type ColorEntity } from "@/features/infrastructure/color.entity";

export type ColorBlockEntity = (PaletteEntity | ColorEntity | GradientEntity);

interface HexHopStore {
    colorBlocks: ColorBlockEntity[];
    actions: HexHopAction;
}

interface HexHopAction {
    setColorBlock: (blocks: ColorBlockEntity[]) => void;
    addColorBlock: (block: ColorBlockEntity) => void;
    removeColorBlock: (id: number) => void;
    updateColorBlock: (block: ColorBlockEntity) => void;
    removeAllPaletteBlocks: (paletteId: number) => void;
}

export const useHexHopStore = create<HexHopStore>((set) => ({
    colorBlocks: [],
    actions: {
        setColorBlock: (blocks: ColorBlockEntity[]): void => {
            set(() => ({ colorBlocks: [...blocks] }));
        },
        addColorBlock: (newBlock: ColorBlockEntity): void => {
            set((state) => ({ colorBlocks: [...state.colorBlocks, newBlock] }));
        },
        removeColorBlock: (id: number): void => {
            set((state) => ({
                colorBlocks: state.colorBlocks.filter((x) => x.id !== id),
            }));
        },
        updateColorBlock: (block: ColorBlockEntity): void => {
            set((state) => ({
                colorBlocks: state.colorBlocks.map((x) => (x.id === block.id ? block : x)),
            }));
        },
        removeAllPaletteBlocks: (paletteId: number): void => {
            set((state) => ({
                colorBlocks: state.colorBlocks.filter((x) => (x.kind === 'palette' || x.paletteId !== paletteId)),
            }));
        },
    }
}));
