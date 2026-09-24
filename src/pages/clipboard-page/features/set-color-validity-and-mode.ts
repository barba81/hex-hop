import { formatHex8, parse } from "culori";
import { useClipboardStore } from "../store/clipboard-store";

export const setColorValidityAndMode = (stringColor: string) => {
    const cleanColorName = stringColor.trim().toLowerCase();
    const color = parse(cleanColorName);

    if (!color) {
        useClipboardStore.setState((state) => {
            state.isColorValid = false;
        });
        return;
    }

    useClipboardStore.setState((state) => {
        state.isColorValid = true;
        state.colorFormat = color.mode;
        state.validColor = formatHex8(color);
    });

}
