import { useHexHopStore } from "@/store/hexhop-store";

export const setLastValidColor = (newColor: string) => {
  useHexHopStore.setState((state) => {
    state.validColor = newColor;
  });
};

export const setIsColorValid = (isColorValid: boolean) => {
  useHexHopStore.setState((state) => {
    state.isColorValid = isColorValid;
  });
};

export const setInputColor = (newColor: string) => {
  useHexHopStore.setState((state) => {
    state.inputColor = newColor;
  });
};

export const setFormat = (newColor: string) => {
  useHexHopStore.setState((state) => {
    state.colorFormat = newColor;
  });
};

export const togglePalette = (paletteId: number) => {
  useHexHopStore.setState((state) => {
    state.openPalette[paletteId] = !state.openPalette[paletteId];
  });
};

export const setEditBlock = (blockId: number | null) => {
  useHexHopStore.setState((state) => {
    state.editBlockId = blockId;
  });
};