import { parse } from "culori";

export const getColorFormat = async (color: string) => {
    const parsed = parse(color);

    if (!parsed) {
        return { isValid: false, format: null };
    }

    return  { isValid: true, format:  parsed.mode };
}