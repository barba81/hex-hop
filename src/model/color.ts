
export type ColorData = {
    r: number;
    g: number;
    b: number;
    a?: number | null;
}

export type ColorEntity = ColorData & {
    id: number;
}