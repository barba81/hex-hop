import type { BlockEntity } from "@/infrastructure/entity";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultInputColor = "#3b82f6";
interface ClipboardStore {
  blocks: BlockEntity[];
  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: (blocks: BlockEntity[]) => void;

  // CREATE -----------------------------------------------------------------------

  addBlock: (gradient: BlockEntity) => void;

  // DELETE  -----------------------------------------------------------------------

  deleteBlock: (blockId: number, paletteId?: number) => void;
  deleteClipboard: () => void;

  // UI  -----------------------------------------------------------------------
  
  setLastValidColor: (color: string) => void;
  setIsColorValid: (colorFormat: boolean) => void;
  setInputColor: (color: string) => void;
  setFormat: (color: string) => void;

}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blocks: [],
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",

  initBlocks: (blocks: BlockEntity[]) =>
    set((state) => {
      state.blocks = blocks;
    }),

  addBlock: (blocks: BlockEntity) =>
    set((state) => {
      state.blocks.push(blocks);
    }),

  deleteBlock: (blockId: number, paletteId?: number) =>
    set((state) => {
      if (paletteId == null) {
        state.blocks = state.blocks.filter((block) => block.blockId !== blockId);
        return;
      }

      const palette = state.blocks.find(
        (block) =>
          block.blockId === paletteId
      );

      if (palette?.kind !== 'palette') return;

      palette.blocks = palette.blocks.filter((block) => block.blockId !== blockId);
    }),
  deleteClipboard: () =>
    set((state) => {
      state.blocks.length = 0;
    }),

  setLastValidColor: (newColor) => set({ validColor: newColor }),
  setIsColorValid: (isColorValid) => set({ isColorValid }),
  setInputColor: (newColor) => set({ inputColor: newColor }),
  setFormat: (newColor) => set({ colorFormat: newColor }),
})));
