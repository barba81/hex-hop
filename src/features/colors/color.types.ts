export type ColorFormat = 'RBG' | 'Tailwind' |  "#" | "HSL" | "OK" | "VEC";

export type ColorData = {
    r: number;
    g: number;
    b: number;
    a?: number | null;
    name: string;
}

export type ColorModel = ColorData & {
    id: number;
}
