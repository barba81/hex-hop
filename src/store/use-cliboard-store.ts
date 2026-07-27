import type { ColorEntity, GradientEntity, PaletteEntity } from "@/infrastructure/entity";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

interface ClipboardStore {
  blocks: (PaletteEntity | ColorEntity | GradientEntity)[];
}

interface ClipboardAction {
  initBlocks: (blocks: (PaletteEntity | ColorEntity | GradientEntity)[]) => void;
}

export const useGradientStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blocks: [],
  initBlocks: (blocks: (PaletteEntity | ColorEntity | GradientEntity)[]) =>
    set((state) => {
      state.blocks = blocks;
    }),
})));
