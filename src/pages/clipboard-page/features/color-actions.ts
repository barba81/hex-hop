import { getColorMode } from "@/infrastructure/utils/color-format-changer";
import { useAppStore } from "@/store/app-store";
import { addNewColorToClipboard } from "./add-block";

export const handleColorChange = (color: string) => {
  const colorMode = getColorMode(color);

  useAppStore.setState((state) => {
    state.inputColor = color;
    if (colorMode) {
      state.isColorValid = true;
      state.colorMode = colorMode;
      state.validColor = color;
    } else {
      state.isColorValid = false;
    }
  });
};

export const handleEyeDropperColorPicker = async () => {
  // mack implementation 
  // const hexColor = await invoke<string | null>('pick_color');


  if (!window.EyeDropper) {
    return;
  }

  const eyeDropper = new window.EyeDropper();

  try {
    const result = await eyeDropper.open();
    addNewColorToClipboard(result.sRGBHex, null);
  } catch (e) {
    console.error(e);
  }
};

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}


