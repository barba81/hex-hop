import type { BlockEntity} from "@/infrastructure/entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface ClipboardStore {
  blocks:BlockEntity[];
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: (blocks:BlockEntity[]) => void;

  // CREATE -----------------------------------------------------------------------

  addColor: (gradient:BlockEntity) => void;

}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blocks: [],
  initBlocks: (blocks:BlockEntity[]) =>
    set((state) => {
      state.blocks = blocks;
    }),

  addColor: (blocks:BlockEntity) =>
    set((state) => {
      state.blocks.push(blocks);
    }),
})));
