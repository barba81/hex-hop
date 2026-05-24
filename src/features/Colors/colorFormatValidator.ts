import { parse, rgb } from "culori";
import { Color } from "@tauri-apps/api/webview";
import { ColorData } from "./types";

type ValidationResult =
    | { isValid: true; format: string; entity: ColorData }
    | { isValid: false; format: null; entity: null };

export class ColorValidator {
    public static validateAndConvert(input: string): ValidationResult {
        const parsed = parse(input);

        if (!parsed) {
            return { isValid: false, format: null, entity: null };
        }

        if (input.startsWith('#') && ![4, 5, 7, 9].includes(input.length)) {
            return { isValid: false, format: null, entity: null };
        }

        const rgbColor = rgb(parsed);
        if (!rgbColor) return { isValid: false, format: null, entity: null };

        const entity: ColorData = {
            r: Math.round(rgbColor.r * 255),
            g: Math.round(rgbColor.g * 255),
            b: Math.round(rgbColor.b * 255),
            a: rgbColor.alpha ?? 1
        };

        return {
            isValid: true,
            format: input.startsWith('#') ? 'hex' : parsed.mode,
            entity
        };
    }
}
export function colorDataToHex(color: ColorData): string {
    const toHex = (value: number): string => {
        const clamped = Math.max(0, Math.min(1, value));
        return Math.round(clamped * 255)
            .toString(16)
            .padStart(2, '0');
    };

    const rHex = toHex(color.r);
    const gHex = toHex(color.g);
    const bHex = toHex(color.b);

    const aHex = color.a !== undefined ? toHex(color.a) : '';

    return `#${rHex}${gHex}${bHex}${aHex}`;
}
