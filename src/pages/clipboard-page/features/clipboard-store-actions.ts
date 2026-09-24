import { useClipboardStore } from "../store/clipboard-store";

export const setInputColor = (newColor: string) => {
  useClipboardStore.setState((state) => {
    state.inputColor = newColor;
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