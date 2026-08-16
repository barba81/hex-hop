import { addNewColorToClipboard } from "./add-block";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { setColorValidityAndMode } from "./set-color-validity-and-mode";

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
        setColorValidityAndMode(result.sRGBHex);
        await addNewColorToClipboard(result.sRGBHex, null);

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
