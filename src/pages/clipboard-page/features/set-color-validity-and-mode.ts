import { formatHex8, parse } from "culori";
import { setFormat, setIsColorValid, setLastValidColor } from "./store-actions/clipboard-store-actions";

export const setColorValidityAndMode = (stringColor: string) => {
    const cleanColorName = stringColor.trim().toLowerCase();
    const color  = parse(cleanColorName);

    if (!color){
        setIsColorValid(false);
        return ;
    }
    setIsColorValid(true);
    setFormat( color.mode );
    setLastValidColor(formatHex8(color));
}
