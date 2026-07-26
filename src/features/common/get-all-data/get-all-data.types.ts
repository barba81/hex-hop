// Palette

export type PaletteDto = {
    id: number;
    order: number;
    name: string;
    blockId:number;
}

// Color

export type ColorDto = {
    id: number;
    order: number;
    paletteId: number;
    blockId:number;
    r: number;
    g: number;
    b: number;
    a: number;
    name: string;
}
