
export interface ClipboardStore {
  editBlockId: number | null;
  openPalette: Record<number, boolean>;

  validColor: string;
  inputColor: string;
  isColorValid: boolean;
  colorFormat: string;

  
  // DND helper 
  sourceDnd: DraggableData | null;
}

export const useClipboardStore = create<ClipboardStore>()(immer((set) => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  copyList: [],
  
  colorCopyFormulaActiveId: null,
  history: {
    clipboard: { ...initialScopeHistory },
    colorBlockSettings: { ...initialScopeHistory },
  },
  
  // only on clipboard
  sourceDnd: null,
  openPalette: {},
  editBlockId: null,
  isColorValid: true,
  validColor: defaultInputColor,
  inputColor: defaultInputColor,
  colorFormat: "RGB",
  setDnd: (  sourceDnd: DraggableData | null) =>
    set((state) => {
      state.sourceDnd = sourceDnd;
    }),
})));