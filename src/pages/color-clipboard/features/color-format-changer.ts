import type { ColorData } from "@/infrastructure/types";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { formatHex, parse } from "culori/fn";

export function colorStringToData(colorString: string){
const color  = parse(colorString);
  if (!color) {
    throw new Error("Invalid color string");
  }
  return color;
}

export function colorDataToRoundData(color: ColorData){
  return {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    a: color.a
  } as ColorData;
}

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
    state.setLastValidColor(formatHex(color));
}
