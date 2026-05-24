import { type PaletteEntity } from "@/features/infrastructure/domain/palette.entity";
import { type ColorEntity } from "@/features/infrastructure/domain/color.entity";
import { type GradientEntity } from "@/features/infrastructure/domain/gradient.entity";
import { create } from "zustand";
import ColorBlock from "@/pages/color-clipboard/color-boxes/color-block";

export type ColorBlock = (PaletteEntity | ColorEntity | GradientEntity);

interface HexHopStore {
    colorBlocks: ColorBlock[]
    actions: HexHopAction;
}

interface HexHopAction {
    setColorBlock: (blocks: ColorBlock[]) => void;
    addColorBlock: (block: ColorBlock) => void;
    removeColorBlock: (id: number) => void;
    updateColorBlock: (block: ColorBlock) => void;
}

export const useHexHopStore = create<HexHopStore>((set) => ({
    colorBlocks: [],
    actions: {
       setColorBlock: (blocks: ColorBlock[]): void => {
            set(() => ({ colorBlocks: [...blocks] }));
        },
        addColorBlock: (newBlock: ColorBlock): void => {
            set((state) => ({ colorBlocks: [...state.colorBlocks, newBlock] }));
        },
        removeColorBlock: (id: number): void => {
            set((state) => ({
                colorBlocks: state.colorBlocks.filter((x) => x.id !== id),
            }));
        },
        updateColorBlock: (block: ColorBlock): void => {
            set((state) => ({
                colorBlocks: state.colorBlocks.map((x) => (x.id === block.id ? block : x)),
            }));
        },
    }
}));
