import { defaultInputColor } from "@/infrastructure/data/const-data";
import type { AppStore} from "@/store/app-store";
import { useAppStore } from "@/store/app-store";
import type { DraggableData } from "../features/darg-and-drop";
import type { ImmerStateCreator } from "@/infrastructure/types";
import { CommandHistory, initialScopeHistory } from "@/store/history-slice";
import { Color } from "culori";

export interface ClipboardSlice {
  openPalette: Record<string, unknown>;
  sourceDnd: DraggableData | null;
  editBlockId: string | null;
  isColorValid: boolean;
  validColor: string;
  inputColor: string;
  colorMode: Color["mode"];
  clipboardHistory: CommandHistory;
}

export const createClipboardSlice: ImmerStateCreator< AppStore, ClipboardSlice> = () => ({
  openPalette: {},
  sourceDnd: null,
  editBlockId: null,
  isColorValid: true,
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  colorMode: "rgb",
  clipboardHistory: initialScopeHistory,
});

export const setDnd = () => {
  useAppStore.setState((state) => {
    state.sourceDnd
    return {...state};
  })
}