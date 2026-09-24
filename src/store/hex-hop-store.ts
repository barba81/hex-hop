import { rootBlockId } from "@/infrastructure/data/const-data";
import type { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import type { BlockEntity } from "@/infrastructure/models/entity";
import { StateCreator } from "zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { defaultInputColor } from "@/infrastructure/data/const-data";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";

export type ImmerStateCreator<T, U = T> = StateCreator<
  T,                                   // full combined store (what set/get see)
  [["zustand/immer", never], never],
  [],
  U                                    // slice this creator actually returns
>;

export interface ClipboardSlice {
  openPalette: Record<string, unknown>;
  sourceDnd: DraggableData | null;
  editBlockId: string | null;
  isColorValid: boolean;
  validColor: string;
  inputColor: string;
  colorFormat: "RGB" | "HSL" | "HEX";
}

export const createClipboardSlice: ImmerStateCreator< AppStore, ClipboardSlice> = () => ({
  openPalette: {},
  sourceDnd: null,
  editBlockId: null,
  isColorValid: true,
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  colorFormat: "RGB",
});


export interface HexHopSlice {
  blockIds: Record<number, number[]>;
  blocksById: Record<number, BlockEntity>;
  copyCopyFormulas: ColorCopyFormula[];
}

export const createHexHopSlice: ImmerStateCreator<AppStore, HexHopSlice> = () => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  copyCopyFormulas: [],
});


export type AppStore = ClipboardSlice & HexHopSlice;

export const useAppStore = create<AppStore>()(
  immer((...a) => ({
    ...createClipboardSlice(...a),
    ...createHexHopSlice(...a),
  })),
);


export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return {...state};
  })
}

// export interface HexHopStore {
//   blockIds: Record<number, number[]>;
//   blocksById: Record<number, BlockEntity>;
//   copyCopyFormulas: ColorCopyFormula[],
// }

// export const useHexHopStore = create<HexHopStore>()(immer((set) => ({
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