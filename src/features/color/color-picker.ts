import { useColorStore } from "@/store/use-color-store";
import { colorStringToData } from "./color-format-changer";
import { addNewColor } from "./add-new-color";
import { setColorValidityAndMode } from "./color-validator";


export const colorPicker = async () => {

    // mack implementation 
    // const hexColor = await invoke<string | null>('pick_color');
    // console.log(hexColor);

    
    if (!window.EyeDropper) {
        return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
        const result = await eyeDropper.open();
        const setInputColor = useColorStore.getState().setInputColor;

        setInputColor(result.sRGBHex);
        const coloBox = colorStringToData(result.sRGBHex);
        addNewColor(coloBox);
        setColorValidityAndMode(result.sRGBHex);
    } catch (e) {
        console.error("Color selection cancelled or failed");
    }
};
