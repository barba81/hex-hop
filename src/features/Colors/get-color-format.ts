import { parse } from "culori";

export const getColorFormat = async (color: string) => {
    const parsed = parse(color);

    if (!parsed) {
        return { isValid: false, format: null };
    }

    return  { isValid: true, format:  parsed.mode };

    // if (input.startsWith('#') && ![4, 5, 7, 9].includes(input.length)) {
    //     return { isValid: false, format: null, entity: null };
    // }

    // const rgbColor = rgb(parsed);
    // if (!rgbColor) return { isValid: false, format: null, entity: null };

    // const entity: ColorData = {
    //     r: Math.round(rgbColor.r * 255),
    //     g: Math.round(rgbColor.g * 255),
    //     b: Math.round(rgbColor.b * 255),
    //     a: rgbColor.alpha ?? 1
    // };

    // return {
    //     isValid: true,
    //     format: input.startsWith('#') ? 'hex' : parsed.mode,
    //     entity
    // };
}