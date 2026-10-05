import { rootBlockId } from '@/shared/data/const-data';
import { historyPush } from '@/shared/history/history';
import type { ColorEntity, PaletteEntity } from '@/shared/models/entity';
import { colorStringToData, getColorMode } from '@/shared/utils/color-format-changer';
import { getSmartColorName } from '@/shared/utils/get-color-name';
import { invoke } from '@tauri-apps/api/core';
import { nanoid } from 'nanoid'

export const createClipboardActions = (set: any) => ({
  addNewColorToClipboard: async (color: string, paletteId: number | null) => {
    const colorData = colorStringToData(color);
    const name = await getSmartColorName(colorData);
    const colorEntity = await invoke<ColorEntity>("create_color", {
      color: { ...colorData, id: nanoid() ,name },
    });
    debugger
    const colorMode = getColorMode(color);

    set((state: any) => {
      state.inputColor = color;
      if (colorMode) {
        state.isColorValid = true;
        state.colorMode = colorMode;
        state.validColor = color;
      } else {
        state.isColorValid = false;
      }
      state.blocksById[colorEntity.blockId] = colorEntity;
      state.blockIds[rootBlockId] = [
        colorEntity.blockId,
        ...(state.blockIds[paletteId ?? rootBlockId] || []),
      ];
      historyPush({ async undo() {}, async redo() {} }, state.clipboardHistory);
    });
  },

  addNewPaletteToClipboard: async (blockIds: number[]) => {
    console.time();
    const paletteEntity = await invoke<PaletteEntity>("create_palette", { 
      palette: { name: "New palette", blockIds } 
    });
    
    set((state: any) => {
      state.blocksById[paletteEntity.blockId] = paletteEntity;
      state.blockIds[rootBlockId] = [paletteEntity.blockId, ...(state.blockIds[rootBlockId] || [])];
      historyPush({ async undo() {}, async redo() {} }, state.clipboardHistory);
      console.timeEnd();
    });
  },

  deleteColorBlock: async (blockId: number, colorId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    set((state: any) => {
      delete state.blocksById[blockId];
      state.blockIds[paletteId ?? rootBlockId] = state.blockIds[paletteId ?? rootBlockId].filter((x: number) => x !== blockId);
    });
  }
});
