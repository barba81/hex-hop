import { useAppStore } from "@/store/app-store";
import { formatHex8, parse } from "culori";

export const setColorValidityAndMode = (stringColor: string) => {
    const cleanColorName = stringColor.trim().toLowerCase();
    const color = parse(cleanColorName);

    if (!color) {
        useAppStore.setState((state) => {
            state.isColorValid = false;
        });
        return;
    }

    useAppStore.setState((state) => {
        state.isColorValid = true;
        state.colorFormat = color.mode;
        state.validColor = formatHex8(color);
    });

}
