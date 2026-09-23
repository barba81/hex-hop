import { formatHex8, parse } from "culori";
import { setFormat, setIsColorValid, setLastValidColor } from "./clipboard-store-actions";
import { useClipboardStore } from "../store/clipboard-store";

export const setColorValidityAndMode = (stringColor: string) => {
    const cleanColorName = stringColor.trim().toLowerCase();
    const color  = parse(cleanColorName);

    if (!color){
        setIsColorValid(false);
        return ;
    }
    
   useClipboardStore.setState((state) => {
      state.isColorValid = true;
      state.colorFormat = color.mode;
      state.validColor = formatHex8(color);
    });
}
