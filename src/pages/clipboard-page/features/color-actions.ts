import { getColorMode } from "@/infrastructure/utils/color-format-changer";
import { useAppStore } from "@/store/app-store";

export const handleColorChange = (color: string) => {
  const colorMode = getColorMode(color);

  if (colorMode) {
    useAppStore.setState((state) => {
      state.isColorValid = true;
      state.inputColor = color;
      state.colorMode = colorMode;
      state.validColor = color;
    });
  } else {
    useAppStore.setState((state) => {
      state.isColorValid = false;
      state.inputColor = color;
    });
  }
};