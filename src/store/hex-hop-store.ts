import type { ColorCopyFormula} from "@/infrastructure/models/color-copy-list";
import type { BlockEntity } from "@/infrastructure/models/entity";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Command } from "./command-manager-state";

export const defaultInputColor = "#3b82f6";
export const rootBlockId = -1;

export type CommandScope = 'clipboard' | 'colorBlockSettings';

export interface CommandHistory {
  undoStack: Command[];
  redoStack: Command[];
}

export interface HexHopStore {
  blockIds: Record<number, number[]>;
  blocksById: Record<number, BlockEntity>;
  history: Record<CommandScope, CommandHistory>;
  copyList: ColorCopyFormula[],
  colorCopyFormulaActiveId: string | null,
}
const initialScopeHistory: CommandHistory = {
  undoStack: [],
  redoStack: [],
};

export const useHexHopStore = create<HexHopStore>()(immer((set) => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  copyList: [],
  
  colorCopyFormulaActiveId: null,
  history: {
    clipboard: { ...initialScopeHistory },
    colorBlockSettings: { ...initialScopeHistory },
  },
})));
  // // ADD BLOCK TO END
  // pushBlock: (block: ColorEntity | GradientEntity, paletteId: number | null) =>
  //   set((state) => {
  //     state.blockIds[paletteId ?? rootBlockId].unshift(block.blockId);
  //     state.blocksById[block.blockId] = block;
  //   }),

  // pushPalette: (palette: PaletteEntity, blockIds: number[]) =>
  //   set((state) => {
  //     state.blockIds[rootBlockId].unshift(palette.blockId);
  //     state.blocksById[palette.blockId] = palette;

  //     for (const blocId of blockIds) {
  //       if (!state.blockIds[palette.id]) state.blockIds[palette.id] = [];
  //       state.blockIds[palette.id].push(blocId);
  //     }
  //   }),

  // insertPalette: (palette: PaletteEntity, blockIds: number[], ix: number) =>
  //   set((state) => {
  //     state.blockIds[rootBlockId].splice(ix, 0, palette.blockId);
  //     state.blocksById[palette.blockId] = palette;

  //     for (const blocId of blockIds) {
  //       if (!state.blockIds[palette.id]) state.blockIds[palette.id] = [];
  //       state.blockIds[palette.id].push(blocId);
  //     }
  //   }),

  // updateBlockSummary: (updateBlock: PaletteEntitySummary | GradientEntitySummary) =>
  //   set((state) => {
  //     const block = state.blocksById[updateBlock.blockId];
  //     if (block) {
  //       Object.assign(block, updateBlock);
  //     }
  //   }),

  // updateBlock: (updateBlock: BlockEntity) =>
  //   set((state) => {
  //     state.blocksById[updateBlock.blockId] = updateBlock;
  //   }),

  // deleteBlock: (blockId, paletteId) =>
  //   set(state => {
  //     state.blockIds[paletteId ?? rootBlockId] = state.blockIds[paletteId ?? rootBlockId].filter(id => id !== blockId);
  //     delete state.blocksById[blockId];
  //   }),

  // deleteClipboard: () =>
  //   set((state) => {
  //     for (const list of Object.values(state.blockIds)) {
  //       list.length = 0;
  //     }
  //     state.blocksById = {}
  //   }),