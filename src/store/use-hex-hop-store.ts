import { type Palette } from "@/features/infrastructure/domain/palette.model";
import { type ColorModel } from "@/features/infrastructure/domain/color.model";
import { type GradientModel } from "@/features/infrastructure/domain/gradient.model";
import { create } from "zustand";
import ColorBlock from "@/pages/color-clipboard/color-boxes/color-block";

export type ColorBlock = (Palette | ColorModel | GradientModel);

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
