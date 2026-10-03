import { rootBlockId } from "@/infrastructure/data/const-data";
import { historyPush } from "@/infrastructure/history/history";
import { ColorEntity } from "@/infrastructure/models/entity";
import { colorStringToData, getColorMode } from "@/infrastructure/utils/color-format-changer";
import { getSmartColorName } from "@/lib/get-color-name";
import { useAppStore } from "@/store/app-store";
import { invoke } from "@tauri-apps/api/core";

export const handleColorChange = (color: string) => {
  
  useAppStore.setState((state) => {
    const colorMode = getColorMode(color);
    state.inputColor = color;
    if (colorMode) {
      state.isColorValid = true;
      state.colorMode = colorMode;
      state.validColor = color;
    } else {
      state.isColorValid = false;
    }
  });
};

export const addNewColorToClipboard = async (
  color: string,
  paletteId: number | null
) => {
  const colorData = colorStringToData(color);
  const name = await getSmartColorName(colorData);
  const colorEntity = await invoke<ColorEntity>('create_color', {
    color: { ...colorData, name }
  });

  useAppStore.setState((state) => {
    const colorMode = getColorMode(color);
    state.inputColor = color;
    if (colorMode) {
      state.isColorValid = true;
      state.colorMode = colorMode;
      state.validColor = color;
    } else {
      state.isColorValid = false;
    }
    state.blocksById[colorEntity.blockId] = colorEntity;
    state.blockIds[rootBlockId] = [colorEntity.blockId, ...(state.blockIds[paletteId ?? rootBlockId] || [])];
    historyPush({ async undo() { }, async redo() { }, }, state.clipboardHistory);
  });
}

