import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ClipboardSlice, createClipboardSlice } from "@/pages/clipboard-page/store/clipboard-store";
import { createHexHopSlice, GlobalSlice } from "./global-slice";

export type AppStore = ClipboardSlice & GlobalSlice;

export const useAppStore = create<AppStore>()(
  immer((...a) => ({
    ...createClipboardSlice(...a),
    ...createHexHopSlice(...a),
  })),
);


// export interface HexHopStore {
//   blockIds: Record<number, number[]>;
//   blocksById: Record<number, BlockEntity>;
//   copyCopyFormulas: ColorCopyFormula[],
// }

// export const useAppStore = create<HexHopStore>()(immer((set) => ({
//   blockIds: { [rootBlockId]: [] },
//   blocksById: {},

//   copyCopyFormulas: [],
// })));
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