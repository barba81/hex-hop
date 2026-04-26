import { parse, rgb } from "culori";
import { ColorEntity } from "@/model/color";

type ValidationResult = 
    | { isValid: true; format: string; entity: ColorEntity } 
    | { isValid: false; format: null; entity: null };

export class ColorValidator {
    /**
     * Validates a string and returns a ColorEntity if successful
     */
    public static validateAndConvert(input: string): ValidationResult {
        const parsed = parse(input);

        // 1. Basic Culori parsing check
        if (!parsed) {
            return { isValid: false, format: null, entity: null };
        }

        // 2. Hex specific length check (Optional: ensures standard hex lengths)
        if (input.startsWith('#') && ![4, 5, 7, 9].includes(input.length)) {
            return { isValid: false, format: null, entity: null };
        }

        // 3. Convert to RGB space to extract 0-255 values
        const rgbColor = rgb(parsed);
        if (!rgbColor) return { isValid: false, format: null, entity: null };

        // 4. Construct the Entity
        const entity: ColorEntity = {
            id: Date.now(), // Or however you generate IDs
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