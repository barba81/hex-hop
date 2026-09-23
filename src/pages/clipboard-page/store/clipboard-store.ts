import { create } from "zustand";
import { DraggableData } from "../features/darg-and-drop";
import { immer } from "zustand/middleware/immer";
import { defaultInputColor } from "@/infrastructure/data/const-data";
import { devtools } from 'zustand/middleware';

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

const storeOptions = {
  name: 'TauriAppStore',
  // Connect explicitly to the standalone DevTools server
  serialize: true,
  actionCreators: {},
  // If you want it to connect to the remote debugger socket:
  connectOptions: {
    hostname: 'localhost',
    port: 8000,
    secure: false,
  },
};

export const useClipboardStore = create<ClipboardStore>()(
  devtools(
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
   storeOptions
  )
);