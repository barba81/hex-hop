import { useAppStore } from "@/store/app-store";

export const setInputColor = (newColor: string) => {
  useAppStore.setState((state) => {
    state.inputColor = newColor;
  });
};

export const togglePalette = (paletteId: number) => {
  useAppStore.setState((state) => {
    state.openPalette[paletteId] = !state.openPalette[paletteId];
  });
};

export const setEditBlock = (blockId: string | null) => {
  useAppStore.setState((state) => {
    state.editBlockId = blockId;
  });
};