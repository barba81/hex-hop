import { useColorStore } from "@/store/use-color-store";
import { colorStringToData } from "./color-format-changer";
import { setColorValidityAndMode } from "./color-validator";
import { addNewColorToClipboard } from "./add-new-block";

export const colorPicker = async () => {

    // mack implementation 
    // const hexColor = await invoke<string | null>('pick_color');

    
    if (!window.EyeDropper) {
        return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
        const result = await eyeDropper.open();
        const setInputColor = useColorStore.getState().setInputColor;

        setInputColor(result.sRGBHex);
        const coloBox = colorStringToData(result.sRGBHex);
        await addNewColorToClipboard(coloBox);
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
