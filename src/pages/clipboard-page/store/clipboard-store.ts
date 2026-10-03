import { defaultInputColor, rootBlockId } from "@/infrastructure/data/const-data";
import type { AppStore } from "@/store/app-store";
import { useAppStore } from "@/store/app-store";
import type { ImmerStateCreator } from "@/infrastructure/types";
import { CommandHistory, initialScopeHistory } from "@/store/history-slice";
import { Color } from "culori";
import { colorStringToData, getColorMode } from "@/infrastructure/utils/color-format-changer";
import { getSmartColorName } from "@/lib/get-color-name";
import { invoke } from "@tauri-apps/api/core";
import { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { historyPush } from "@/infrastructure/history/history";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";

export interface ClipboardSlice {
  openPalette: Record<string, unknown>;
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
    set((state) => {
       state.editBlockId = blockId;
    });
  },

  togglePalette: (paletteId) => {
    set((state) => {
      state.openPalette[paletteId] = !state.openPalette[paletteId];
    });
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
  addNewPaletteToClipboard: async (blockIds) => {
    console.time();

    const paletteEntity = await invoke<PaletteEntity>("create_palette", { palette: { name: "New palette", blockIds } });
    set((state) => {
      state.blocksById[paletteEntity.blockId] = paletteEntity;
      state.blockIds[rootBlockId] = [paletteEntity.blockId, ...(state.blockIds[rootBlockId] || [])];
      historyPush({ async undo() { }, async redo() { }, }, state.clipboardHistory);
      console.timeEnd();

    });
  }
});

export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return { ...state };
  })
}