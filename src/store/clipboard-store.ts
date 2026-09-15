import { ColorCopyFormula, defaultColorCopyFormula, defaultColorCopyList } from "@/infrastructure/models/color-copy-list";
import type { BlockEntity, ColorEntity, GradientEntity, GradientEntitySummary, PaletteEntity, PaletteEntitySummary } from "@/infrastructure/models/entity";
import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const defaultInputColor = "#3b82f6";
export const rootBlockId = -1;

interface ClipboardStore {
  blockIds: Record<number, number[]>;
  blocksById: Record<number, BlockEntity>;

  editBlockId: number | null;

  openPalette: Record<number, boolean>;

  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
  copyList: ColorCopyFormula[],
  colorCopyFormulaActiveId: string | null,
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: () => Promise<void>;

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
  setEditBlock: (blockId: number | null) => void;
  setColorCopyFormulaActive: (blockId: string | null) => void;
  flitColorCopyBloc: (blockId: string | null) => void;
  reorderBlocks: (reorderedBlocks: { blockId: number[], paletteId: number | null }[]) => void;
  addNewColorCopyBlock: () => void;
}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set, get) => ({
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
  initBlocks: async () => {
    const blocks = await invoke<BlockEntity[]>("load_state");
    const allCopyFormulas = await invoke<ColorCopyFormula[]>("get_all_color_copy_formula");

    return set(state => {
      state.colorCopyFormulaActiveId = allCopyFormulas[0].id;
      state.copyList = allCopyFormulas;

      state.blockIds[rootBlockId] = blocks.map(block => block.blockId);

      state.blocksById = {};

      for (const block of blocks) {
        state.blocksById[block.blockId] = block;

        if (block.kind === 'palette') {

          if (!block.blocks) { continue; }
          state.blockIds[block.id] = block.blocks.map(x => x.blockId);

          for (const inner_block of block.blocks) {
            state.blocksById[inner_block.blockId] = inner_block;
          }
        }
      }
    }
    )
  },

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
  setColorCopyFormulaActive: (blockId) =>
    set((state) => {
      state.colorCopyFormulaActiveId = blockId;
    }),
  flitColorCopyBloc: async (copyListId) => {
    
    const state = get();
    const copyBlockIx = state.copyList.findIndex(x => x.id === copyListId);
    
    if (copyBlockIx < 0) return;

    const oldBlock =  state.copyList[copyBlockIx];
    const newCopyFormula = await invoke<ColorCopyFormula>("update_color_copy_formula", { 
      colorCopyFormula: {...oldBlock, enabled: !oldBlock.enabled }
    });
    console.log(newCopyFormula);
    debugger
   return set((state) => {
      state.copyList[copyBlockIx] = newCopyFormula;
    })
  },
  addNewColorCopyBlock: async () =>{
    const newCopyFormula = await invoke<ColorCopyFormula>("create_color_copy_formula", { 
      colorCopyFormula: {...defaultColorCopyFormula, id:crypto.randomUUID()}
    });
    return set((state) => {
      state.copyList.push(newCopyFormula);
    })
  }
})));
