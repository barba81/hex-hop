import { useClipboardStore } from "@/store/use-clipboard-store";
import { formatHex, parse } from "culori/fn";

export const setColorValidityAndMode = (stringColor: string) => {
    const color = validateColor(stringColor);

    const state = useClipboardStore.getState();
    if (!color){
        state.setIsColorValid(false);
        return ;
    }

    state.setIsColorValid(true);
    state.setFormat( color.mode);
    state.setLastValidColor(formatHex(color));
}

const validateColor = (stringColor: string) => {
    const color  = parse(stringColor);

    if (!color ) {
        return null;
    }
    return color ;
}