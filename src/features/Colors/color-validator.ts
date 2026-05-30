import { formatHex, parse } from "culori";
import { useColorStore } from "@/store/use-color-store";

export const setColorValidityAndMode = (stringColor: string) => {
    const color = validateColor(stringColor);

    const state = useColorStore.getState();
    if (!color){
        state.setIsColorValid(false);
        return ;
    }

    state.setIsColorValid(true);
    state.setFormat( color.mode);
    state.setLastValidColor(formatHex(color));
}

export const validateColor = (stringColor: string) => {
    const color  = parse(stringColor);

    if (!color ) {
        return null;
    }
    return color ;
}