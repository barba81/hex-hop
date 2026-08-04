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
  deleteClipboard: () => void;

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
})));
