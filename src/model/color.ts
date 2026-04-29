export type ColorFormat = 'RBG' | 'Tailwind' |  "#" | "HSL" | "OK" | "VEC";

export type ColorData = {
    r: number;
    g: number;
    b: number;
    a?: number | null;
}

export type ColorEntity = ColorData & {
    id: number;
}
