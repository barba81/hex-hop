import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { getSmartColorName } from "./get-color-name";
import { colorStringToData } from "@/infrastructure/utils/color-format-changer";
import { rootBlockId } from "@/infrastructure/data/const-data";
import { useAppStore } from "@/store/app-store";
import { historyPush } from "@/infrastructure/history/history";

export const addNewColorToClipboard = async (
  inputColor: string,
  paletteId: number | null
) => {
  const colorData = colorStringToData(inputColor);
  const name = await getSmartColorName(colorData);
  const colorEntity = await invoke<ColorEntity>('create_color', {
    color: { ...colorData, name }
  });

  useAppStore.setState((state) => {
    state.blocksById[colorEntity.blockId] = colorEntity;
    state.blockIds[rootBlockId] = [colorEntity.blockId, ...(state.blockIds[paletteId ?? rootBlockId] || [])];
    historyPush({ async undo() { }, async redo() { }, }, state.clipboardHistory);
  });
}

export const addNewPalette = async (blockIds: number[]) => {
  const paletteEntity = await invoke<PaletteEntity>("create_palette", { palette: { name: "New palette", blockIds } });
  useAppStore.setState((state) => {
    state.blocksById[paletteEntity.blockId] = paletteEntity;
    state.blockIds[rootBlockId] = [paletteEntity.blockId, ...(state.blockIds[rootBlockId] || [])];
    historyPush({ async undo() { }, async redo() { }, }, state.clipboardHistory);
  });

  //   useColorListCommands.getState().push({
  //     async undo() {
  //         await invoke("soft_delete_block", { blockId });
  //         useAppStore.getState().deleteBlock(blockId, null);
  //     },
  //     async redo() {
  //         const entity = await invoke<PaletteEntity>("restore_palette", { paletteId:paletteId});
  //         useAppStore.getState().pushPalette(entity, blockIds);
  //     },
  // });
}




// await pushCommand('clipboard', {
//   async undo() {
//     await invoke('soft_delete_block', { blockId });
//     deleteBlockFromStore(blockId, paletteId);
//   },
//   async redo() {
//     const entity = await invoke<ColorEntity>('restore_color', {
//       colorId: colorEntity.id
//     });
//     pushBlockToStore(entity, null);
//   },
// });

// export const addNewColorToClipboard = async (inputColor: string, paletteId: number | null) => {

//     const colorData = colorStringToData(inputColor);

//     const name = await getSmartColorName(colorData);
//     const colorEntity = await invoke<ColorEntity>("create_color", { color: { ...colorData, name: name } });
//     useAppStore.getState().pushBlock(colorEntity, null);
//     const blockId = colorEntity.blockId;

//     useColorListCommands.getState().push({
//         async undo() {
//             await invoke("soft_delete_block", { blockId });
//             useAppStore.getState().deleteBlock(blockId, paletteId);
//         },
//         async redo() {
//             const entity = await invoke<ColorEntity>("restore_color", { colorId:colorEntity.id });
//             useAppStore.getState().pushBlock(entity, null);
//         },
//     });
// }

// export const pushBlockToStore = (colorEntity: ColorEntity, targetId: number | null) => {
//   useAppStore.setState((state) => ({
//     blocksById: { ...state.blocksById, [colorEntity.blockId]: colorEntity },
//     blockIds: {
//       ...state.blockIds,
//       [rootBlockId]: [...(state.blockIds[rootBlockId] || []), colorEntity.blockId],
//     },
//   }));
// };

// export const deleteBlockFromStore = (blockId: number, paletteId: number | null) => {
//   useAppStore.setState((state) => {
//     const { [blockId]: _, ...remainingBlocks } = state.blocksById;
//     return {
//       blocksById: remainingBlocks,
//       blockIds: {
//         ...state.blockIds,
//         [rootBlockId]: state.blockIds[rootBlockId]?.filter((id) => id !== blockId) || [],
//       },
//     };
//   });
// };