import { useClipboardStore } from "@/store/clipboard-store";

export const setLastValidColor = (newColor: string) => {
  useClipboardStore.setState((state) => {
    state.validColor = newColor;
  });
};

export const setIsColorValid = (isColorValid: boolean) => {
  useClipboardStore.setState((state) => {
    state.isColorValid = isColorValid;
  });
};

export const setInputColor = (newColor: string) => {
  useClipboardStore.setState((state) => {
    state.inputColor = newColor;
  });
};

export const setFormat = (newColor: string) => {
  useClipboardStore.setState((state) => {
    state.colorFormat = newColor;
  });
};

export const togglePalette = (paletteId: number) => {
  useClipboardStore.setState((state) => {
    state.openPalette[paletteId] = !state.openPalette[paletteId];
  });
};

export const setEditBlock = (blockId: number | null) => {
  useClipboardStore.setState((state) => {
    state.editBlockId = blockId;
  });
};