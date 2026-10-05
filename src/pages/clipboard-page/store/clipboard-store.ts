import { defaultInputColor, rootBlockId } from "@/infrastructure/data/const-data";
import type { AppStore } from "@/shared/store/app-store";
import { useAppStore } from "@/shared/store/app-store";
import type { ImmerStateCreator } from "@/infrastructure/types";
import { CommandHistory, initialScopeHistory } from "@/shared/store/history-slice";
import { Color } from "culori";
import { colorStringToData, getColorMode } from "@/infrastructure/utils/color-format-changer";
import { getSmartColorName } from "@/shared/utils/get-color-name";
import { invoke } from "@tauri-apps/api/core";
import { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { historyPush } from "@/infrastructure/history/history";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";
import { createClipboardActions } from "@/pages/clipboard-page/store/clipboard-actions";

export interface ClipboardSlice {
  openPalette: Record<string, boolean>;
  sourceDnd: DraggableData | null;
  editBlockId: string | null;
  isColorValid: boolean;
  validColor: string;
  inputColor: string;
  colorMode: Color["mode"];
  clipboardHistory: CommandHistory;

  setEditBlock: (blockId: string | null) => void;
  togglePalette: (paletteId: number) => void;
  handleColorChange: (color: string) => void;
  addNewColorToClipboard: (color: string, paletteId: number | null) => Promise<void>;
  addNewPaletteToClipboard: (blockIds: number[]) => Promise<void>;
  deleteColorBlock:  (blockId: number, colorId: number, paletteId: number | null) => Promise<void>;
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

  setEditBlock: (blockId) => {
    set((state) => { state.editBlockId = blockId; });
  },
  
  togglePalette: (paletteId) => {
    set((state) => { state.openPalette[paletteId] = !state.openPalette[paletteId]; });
  },
  
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
  ...createClipboardActions(set)
});

export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return { ...state };
  })
}