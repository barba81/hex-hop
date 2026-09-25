import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { getSmartColorName } from "./get-color-name";
import { colorStringToData } from "@/infrastructure/utils/color-format-changer";
import { pushCommand } from "@/infrastructure/history/history";
import { rootBlockId } from "@/infrastructure/data/const-data";
import { useAppStore } from "@/store/store";


export const pushBlockToStore = (colorEntity: ColorEntity, targetId: number | null) => {
  useAppStore.setState((state) => ({
    blocksById: { ...state.blocksById, [colorEntity.blockId]: colorEntity },
    blockIds: {
      ...state.blockIds,
      [rootBlockId]: [...(state.blockIds[rootBlockId] || []), colorEntity.blockId],
    },
  }));
};

export const deleteBlockFromStore = (blockId: number, paletteId: number | null) => {
  useAppStore.setState((state) => {
    const { [blockId]: _, ...remainingBlocks } = state.blocksById;
    return {
      blocksById: remainingBlocks,
      blockIds: {
        ...state.blockIds,
        [rootBlockId]: state.blockIds[rootBlockId]?.filter((id) => id !== blockId) || [],
      },
    };
  });
};


export const addNewColorToClipboard = async (
  inputColor: string, 
  paletteId: number | null
) => {
  // 1. Process color inputs & invoke creation
  const colorData = colorStringToData(inputColor);
  const name = await getSmartColorName(colorData);
  const colorEntity = await invoke<ColorEntity>('create_color', { 
    color: { ...colorData, name } 
  });

  const blockId = colorEntity.blockId;

  // 2. Initial state sync (Push created block)
  pushBlockToStore(colorEntity, null);

  // 3. Register command via external history action
  await pushCommand('clipboard', {
    async undo() {
      await invoke('soft_delete_block', { blockId });
      deleteBlockFromStore(blockId, paletteId);
    },
    async redo() {
      const entity = await invoke<ColorEntity>('restore_color', { 
        colorId: colorEntity.id 
      });
      pushBlockToStore(entity, null);
    },
  });
};


// export const addNewColorToClipboard = async (inputColor: string, paletteId: number | null) => {
    
//     const colorData = colorStringToData(inputColor);

//     const name = await getSmartColorName(colorData);
//     const colorEntity = await invoke<ColorEntity>("create_color", { color: { ...colorData, name: name } });
//     useClipboardStore.getState().pushBlock(colorEntity, null);
//     const blockId = colorEntity.blockId;

//     useColorListCommands.getState().push({
//         async undo() {
//             await invoke("soft_delete_block", { blockId });
//             useClipboardStore.getState().deleteBlock(blockId, paletteId);
//         },
//         async redo() {
//             const entity = await invoke<ColorEntity>("restore_color", { colorId:colorEntity.id });
//             useClipboardStore.getState().pushBlock(entity, null);
//         },
//     });
// }

export const addNewPalette = async (blockIds: number[]) => {
    const paletteEntity = await invoke<PaletteEntity>("create_palette", { palette: { name: "New palette", blockIds } });
    // useAppStore.getState().pushPalette(paletteEntity, blockIds);
    const blockId = paletteEntity.blockId;
    const paletteId = paletteEntity.id;

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




