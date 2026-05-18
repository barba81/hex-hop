import { parse, rgb } from "culori";
import { ColorData } from "@/features/colors/color.types";

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