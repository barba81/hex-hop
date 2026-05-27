import { useColorStore } from "@/store/use-color-store";
import { formatHex, parse, rgb } from "culori";
import { ColorData } from "./types";

export const validateColor = async (color: string) => {
    const parsed = parse(color);

    const state = useColorStore.getState();
    if (!parsed) {
        state.setIsColorValid(false);
        return ;
    }

    state.setIsColorValid(true);
    state.setFormat( parsed.mode);
    state.setLastValidColor(formatHex(parsed));

}