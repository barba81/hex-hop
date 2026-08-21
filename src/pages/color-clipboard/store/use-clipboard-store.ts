import type { BlockEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ReorderBlock } from "../features/darg-and-drop";

const defaultInputColor = "#3b82f6";
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
}

interface ClipboardAction {
  // INIT -----------------------------------------------------------------------

  initBlocks: (blocks: BlockEntity[]) => void;

  // CREATE -----------------------------------------------------------------------

  addBlock: (block: BlockEntity, paletteId: number | null) => void;
  addPalette: (palette: PaletteEntity, blockId: number[]) => void;

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
  updateOrder: (blocks: ReorderBlock[]) => void;
  setBlocksIds: (blocks: {blockId: number[], paletteId: number | null}[]) => void;
}

export const useClipboardStore = create<ClipboardStore & ClipboardAction>()(immer((set) => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  isColorValid: true,
  colorFormat: "RGB",
  openPalette: {},
  editBlockId: null,
  initBlocks: (blocks) =>
    set(state => {
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
    }),

    updateOrder: (blocks) =>
    set(state => {
      for(const block of blocks){
        state.blocksById[block.blockId].blockOrder = block.blockOrder;
      }
    }),

  setBlocksIds: (blocks) =>
    set(state => {
      for(const block of blocks){
        state.blockIds[block.paletteId ?? rootBlockId] = block.blockId;
        for(const bb of block.blockId){
          const b =  state.blocksById[bb];
          if ( b.kind !== 'palette'){
            b.parentPaletteId = block.paletteId;
          }
        }
      }
    }),


  // ADD BLOCK TO END
  addBlock: (block: BlockEntity, paletteId: number | null) =>
    set((state) => {
      state.blockIds[paletteId ?? rootBlockId].unshift(block.blockId);
      state.blocksById[block.blockId] = block;
    }),

  addPalette: (palette: PaletteEntity, blockIds: number[]) =>
    set((state) => {
      state.blockIds[rootBlockId].unshift(palette.blockId);
      state.blocksById[palette.blockId] = palette;

      for (const blocId of blockIds) {
        if (!state.blockIds[palette.id]) state.blockIds[palette.id] = [];
        state.blockIds[palette.id].push(blocId);
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
})));
