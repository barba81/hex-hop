export type ColorEntity =  {
    kind: "color",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
    r: number;
    g: number;
    b: number;
    alpha?: number;
    parentPaletteId: number | null;
}