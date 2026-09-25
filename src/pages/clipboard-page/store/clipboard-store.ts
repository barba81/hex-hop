import { defaultInputColor } from "@/infrastructure/data/const-data";
import { AppStore, ImmerStateCreator, useStore } from "@/store/store";
import { DraggableData } from "../features/darg-and-drop";

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
  useStore.setState((state) => {
    state.sourceDnd
    return {...state};
  })
}