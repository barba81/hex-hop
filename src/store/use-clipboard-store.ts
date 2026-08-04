import type { BlockEntity } from "@/infrastructure/entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface ClipboardStore {
  blocks: BlockEntity[];
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: (blocks: BlockEntity[]) => void;

  // CREATE -----------------------------------------------------------------------

  addBlock: (gradient: BlockEntity) => void;

  // DELETE  -----------------------------------------------------------------------
  deleteBlock: (blockId: number, paletteId?: number) => void;

}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blocks: [],
  initBlocks: (blocks: BlockEntity[]) =>
    set((state) => {
      state.blocks = blocks;
    }),

  addBlock: (blocks: BlockEntity) =>
    set((state) => {
      state.blocks.push(blocks);
    }),

  // NEED TO UPDATE TO PALETTE
  deleteBlock: (blockId: number, paletteId?: number) =>
    set((state) => {
      if (paletteId === undefined) {
        const index = state.blocks.findIndex((x) => x.blockId === blockId);
        if (index === -1) return;
        state.blocks.splice(index, 1);
      } else {
        const index = state.blocks.findIndex((x) => x.blockId === paletteId);
        if (index === -1) return;
        const palette = state.blocks[index];
        if (palette.kind !== 'palette') return;
        const index2 = palette.blocks.findIndex((x) => x.blockId === blockId);
        if (index2 === -1) return;
        palette.blocks.splice(index2, 1);
      }
    }),
})));
