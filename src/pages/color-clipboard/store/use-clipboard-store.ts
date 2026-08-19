import type { BlockEntity } from "@/infrastructure/models/entity";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultInputColor = "#3b82f6";

interface ClipboardStore {
  blockIds: number[];
  blocksById: Record<number, BlockEntity>;

  editBlockId: number | null;

  openPalette: Record<number, boolean>;

  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: (blocks: BlockEntity[]) => void;

  // CREATE -----------------------------------------------------------------------

  addBlock: (block: BlockEntity) => void;

  // UPDATE -----------------------------------------------------------------------

  updateBlock: (block: BlockEntity) => void;

  // DELETE  -----------------------------------------------------------------------

  deleteBlock: (blockId: number, paletteId: number | null) => void;
  deleteClipboard: () => void;

  // UI  -----------------------------------------------------------------------

  setLastValidColor: (color: string) => void;
  setIsColorValid: (colorFormat: boolean) => void;
  setInputColor: (color: string) => void;
  setFormat: (color: string) => void;
  togglePalette: (paletteId: number) => void;
  setEditBlock: (blockId: number | null) => void;

  setBlockIds: (blockId: number[]) => void;
}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blockIds: [],
  blocksById: {},
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",
  openPalette: {},
  editBlockId: null,
  setBlockIds: (blockIds) =>
    set(state => {
      state.blockIds=blockIds;
    }),

  initBlocks: (blocks) =>
    set(state => {
      state.blockIds = blocks.map(block => block.blockId);

      state.blocksById = {};

      for (const block of blocks) {
        state.blocksById[block.blockId] = block;
      }
    }),

  addBlock: (block: BlockEntity) =>
    set((state) => {
      state.blockIds.unshift(block.blockId);
      state.blocksById[block.blockId] = block;
    }),


  updateBlock: (updateBlock: BlockEntity) =>
    set((state) => {
      state.blocksById[updateBlock.blockId] = updateBlock;
    }),

  deleteBlock: (blockId) =>
    set(state => {
      state.blockIds = state.blockIds.filter(id => id !== blockId);
      delete state.blocksById[blockId];
    }),
  deleteClipboard: () =>
    set((state) => {
      state.blockIds.length = 0;
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
