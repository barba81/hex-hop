import type { BlockEntity } from "@/infrastructure/models/entity";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultInputColor = "#3b82f6";
interface ClipboardStore {
  blocks: BlockEntity[];
  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
  openPalette: Record<number, boolean>;
  editBlockId: number | null;
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
  togglePalette: (paletteId: number) => void;
  setEditBlock: (blockId: number) => void;
}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blocks: [],
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",
  openPalette: {},
  editBlockId: null,

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
  togglePalette: (paletteId) =>
    set((state) => {
      state.openPalette[paletteId] = !state.openPalette[paletteId];
    }),
  setEditBlock: (blockId) =>
    set((state) => {
      state.editBlockId = blockId;
    }),
})));
