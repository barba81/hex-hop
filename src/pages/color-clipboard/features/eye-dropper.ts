import { addNewColorToClipboard } from "./add-new-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { setColorValidityAndMode } from "./color-format-changer";

export const eyeDropperColorPicker = async () => {

    // mack implementation 
    // const hexColor = await invoke<string | null>('pick_color');

    
    if (!window.EyeDropper) {
        return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
        const result = await eyeDropper.open();
        const setInputColor = useClipboardStore.getState().setInputColor;

        setInputColor(result.sRGBHex);
        await addNewColorToClipboard(result.sRGBHex);
        setColorValidityAndMode(result.sRGBHex);

      } catch (e) {
        console.error("Color selection cancelled or failed");
    }
};


declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}
