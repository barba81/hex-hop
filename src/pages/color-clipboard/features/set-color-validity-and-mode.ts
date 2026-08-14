import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { formatHex8, parse } from "culori";

export const setColorValidityAndMode = (stringColor: string) => {
    const cleanColorName = stringColor.trim().toLowerCase();
    const color  = parse(cleanColorName);

    const state = useClipboardStore.getState();
    if (!color){
        state.setIsColorValid(false);
        return ;
    }

    state.setIsColorValid(true);
    state.setFormat( color.mode );
    state.setLastValidColor(formatHex8(color));
}
