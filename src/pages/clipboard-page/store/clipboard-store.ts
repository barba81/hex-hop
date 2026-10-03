import { defaultInputColor, rootBlockId } from "@/infrastructure/data/const-data";
import type { AppStore } from "@/store/app-store";
import { useAppStore } from "@/store/app-store";
import type { DraggableData } from "../features/darg-and-drop";
import type { ImmerStateCreator } from "@/infrastructure/types";
import { CommandHistory, initialScopeHistory } from "@/store/history-slice";
import { Color } from "culori";
import { colorStringToData, getColorMode } from "@/infrastructure/utils/color-format-changer";
import { getSmartColorName } from "@/lib/get-color-name";
import { invoke } from "@tauri-apps/api/core";
import { ColorEntity } from "@/infrastructure/models/entity";
import { historyPush } from "@/infrastructure/history/history";

export interface ClipboardSlice {
  openPalette: Record<string, unknown>;
  sourceDnd: DraggableData | null;
  editBlockId: string | null;
  isColorValid: boolean;
  validColor: string;
  inputColor: string;
  colorMode: Color["mode"];
  clipboardHistory: CommandHistory;

  handleColorChange: (color: string) => void;
  addNewColorToClipboard: (
    color: string,
    paletteId: number | null
  ) => Promise<void>;
}

export const createClipboardSlice: ImmerStateCreator<AppStore, ClipboardSlice> = (set) => ({
  openPalette: {},
  sourceDnd: null,
  editBlockId: null,
  isColorValid: true,
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  colorMode: "rgb",
  clipboardHistory: initialScopeHistory,
  
  handleColorChange: (color) => {
    const colorMode = getColorMode(color);

    set((state) => {
      state.inputColor = color;

      if (colorMode) {
        state.isColorValid = true;
        state.colorMode = colorMode;
        state.validColor = color;
      } else {
        state.isColorValid = false;
      }
    });
  },
  addNewColorToClipboard: async (color, paletteId) => {
    const colorData = colorStringToData(color);
    const name = await getSmartColorName(colorData);

    const colorEntity = await invoke<ColorEntity>("create_color", {
      color: {
        ...colorData,
        name,
      },
    });

    const colorMode = getColorMode(color);

    set((state) => {
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

      historyPush(
        {
          async undo() { },
          async redo() { },
        },
        state.clipboardHistory
      );
    });
  },

});

export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return { ...state };
  })
}