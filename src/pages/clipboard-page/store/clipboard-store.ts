import { defaultInputColor } from "@/infrastructure/data/const-data";
import { AppStore, useAppStore } from "@/store/app-store";
import { DraggableData } from "../features/darg-and-drop";
import { ImmerStateCreator } from "@/infrastructure/types";

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

export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return {...state};
  })
}