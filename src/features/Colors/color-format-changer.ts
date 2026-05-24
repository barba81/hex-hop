import { ColorData } from "./types";


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
