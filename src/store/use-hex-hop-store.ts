
import { create } from "zustand";
import ColorBlock from "@/pages/color-clipboard/color-list/color-box/color-block";
import { type PaletteEntity } from "@/features/infrastructure/entity/palette.entity";
import { type GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { type ColorEntity } from "@/features/infrastructure/entity/color.entity";

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
