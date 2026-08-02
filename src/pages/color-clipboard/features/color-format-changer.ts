import { ColorData } from "@/infrastructure/types";
import { rgb } from "culori";


/**
 * Converts normalized color components to a hexadecimal color string.
 *
 * @param color - The color with RGB components and an optional alpha component normalized to values from 0 to 1
 * @returns A hexadecimal color string with an optional alpha channel
 */
export function colorDataToHex(color: ColorData) {
    const toHex = (value: number): string => {
        const clamped = Math.max(0, Math.min(1, value));
        return Math.round(clamped * 255)
            .toString(16)
            .padStart(2, '0');
    };

    const rHex = toHex(color.r);
    const gHex = toHex(color.g);
    const bHex = toHex(color.b);
    const aHex = (color.a !== undefined && color.a !== null) ? toHex(color.a) : '';

    return `#${rHex}${gHex}${bHex}${aHex}`;
}

/**
 * Parses a color string into normalized RGB color data.
 *
 * @param color - The color string to parse
 * @returns The parsed red, green, blue, and alpha components
 * @throws Error if the color string is invalid
 */
export function colorStringToData(color: string){
 const rbg = rgb(color);
  if (!rbg) {
    throw new Error("Invalid color string");
  }
  return {
    r: rbg.r,
    g: rbg.g,
    b: rbg.b,
    a: rbg.alpha,
  } as ColorData;
}

export function colorDataToRoundData(color: ColorData){
  return {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    a: color.a
  } as ColorData;

}

export const toNormalForm  = (color: ColorData) => {
        return {
            mode: 'rgb' as const,
            r: color.r / 255,
            g: color.g / 255,
            b: color.b / 255,
            alpha: color.a ?? 1
        };
    }