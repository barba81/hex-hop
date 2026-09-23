import { create } from "zustand";
import { DraggableData } from "../features/darg-and-drop";
import { immer } from "zustand/middleware/immer";
import { defaultInputColor } from "@/infrastructure/data/const-data";

export interface ClipboardStore {
  editBlockId: number | null;
  openPalette: Record<number, boolean>;
  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;
  sourceDnd: DraggableData | null;

  setDnd: (sourceDnd: DraggableData | null) => void;
}

export const useClipboardStore = create<ClipboardStore>()(
  immer((set) => ({
    openPalette: {},
    sourceDnd: null,
    editBlockId: null,
    isColorValid: true,
    validColor: defaultInputColor,
    inputColor: defaultInputColor,
    colorFormat: "RGB",

    setDnd: (sourceDnd) =>
      set((state) => {
        state.sourceDnd = sourceDnd;
      }),
  })),
);


