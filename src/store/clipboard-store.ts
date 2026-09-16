import type { ColorCopyFormula} from "@/infrastructure/models/color-copy-list";
import { defaultColorCopyFormula, defaultColorCopyList } from "@/infrastructure/models/color-copy-list";
import type { BlockEntity, ColorEntity, GradientEntity, GradientEntitySummary, PaletteEntity, PaletteEntitySummary } from "@/infrastructure/models/entity";
import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const defaultInputColor = "#3b82f6";
export const rootBlockId = -1;

interface ClipboardStore {
  // Clipboard -----------------------------------------------------------------------

  blockIds: Record<number, number[]>;
  blocksById: Record<number, BlockEntity>;

  editBlockId: number | null;

  openPalette: Record<number, boolean>;

  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;

  // Color blocks settings  -----------------------------------------------------------------------

  copyList: ColorCopyFormula[],
  colorCopyFormulaActiveId: string | null,
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------


  // CREATE -----------------------------------------------------------------------

  pushBlock: (block: ColorEntity | GradientEntity, paletteId: number | null) => void;
  pushPalette: (palette: PaletteEntity, blockId: number[]) => void;
  insertPalette: (palette: PaletteEntity, blockId: number[], ix: number) => void;

  // UPDATE -----------------------------------------------------------------------
  updateBlock: (block: BlockEntity) => void;
  updateBlockSummary: (updateBlock: PaletteEntitySummary | GradientEntitySummary) => void;

  // DELETE  -----------------------------------------------------------------------

  deleteBlock: (blockId: number, paletteId: number | null) => void;
  deleteClipboard: () => void;

  // UI  -----------------------------------------------------------------------

  setLastValidColor: (color: string) => void;
  setIsColorValid: (colorFormat: boolean) => void;
  setInputColor: (color: string) => void;
  setFormat: (color: string) => void;
  togglePalette: (paletteId: number) => void;
  setColorCopyFormulaActive: (blockId: string | null) => void;
  reorderBlocks: (reorderedBlocks: { blockId: number[], paletteId: number | null }[]) => void;
}

export const useClipboardStore = create<ClipboardStore>()(immer((set, get) => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",
  openPalette: {},
  editBlockId: null,
  copyList: [],
  colorCopyFormulaActiveId: null,

  reorderBlocks: (reorderedBlocks) =>
    set(state => {
      for (const block of reorderedBlocks) {
        for (const [ix, blockId] of block.blockId.entries()) {
          const childBlock = state.blocksById[blockId];

          childBlock.blockOrder = block.blockId.length - ix

          if (childBlock.kind !== 'palette') {
            childBlock.parentPaletteId = block.paletteId;
          }
        }
        state.blockIds[block.paletteId ?? rootBlockId] = block.blockId;
      }
    }),

  // ADD BLOCK TO END
  pushBlock: (block: ColorEntity | GradientEntity, paletteId: number | null) =>
    set((state) => {
      state.blockIds[paletteId ?? rootBlockId].unshift(block.blockId);
      state.blocksById[block.blockId] = block;
    }),

  pushPalette: (palette: PaletteEntity, blockIds: number[]) =>
    set((state) => {
      state.blockIds[rootBlockId].unshift(palette.blockId);
      state.blocksById[palette.blockId] = palette;

      for (const blocId of blockIds) {
        if (!state.blockIds[palette.id]) state.blockIds[palette.id] = [];
        state.blockIds[palette.id].push(blocId);
      }
    }),

  insertPalette: (palette: PaletteEntity, blockIds: number[], ix: number) =>
    set((state) => {
      state.blockIds[rootBlockId].splice(ix, 0, palette.blockId);
      state.blocksById[palette.blockId] = palette;

      for (const blocId of blockIds) {
        if (!state.blockIds[palette.id]) state.blockIds[palette.id] = [];
        state.blockIds[palette.id].push(blocId);
      }
    }),

  updateBlockSummary: (updateBlock: PaletteEntitySummary | GradientEntitySummary) =>
    set((state) => {
      const block = state.blocksById[updateBlock.blockId];
      if (block) {
        Object.assign(block, updateBlock);
      }
    }),

  updateBlock: (updateBlock: BlockEntity) =>
    set((state) => {
      state.blocksById[updateBlock.blockId] = updateBlock;
    }),

  deleteBlock: (blockId, paletteId) =>
    set(state => {
      state.blockIds[paletteId ?? rootBlockId] = state.blockIds[paletteId ?? rootBlockId].filter(id => id !== blockId);
      delete state.blocksById[blockId];
    }),

  deleteClipboard: () =>
    set((state) => {
      for (const list of Object.values(state.blockIds)) {
        list.length = 0;
      }
      state.blocksById = {}
    }),

})));
