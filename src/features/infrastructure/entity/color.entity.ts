export type ColorEntity =  {
    kind: "color",
    id: number;
    blockId:number;
    order: number;
    name: string;
    r: number;
    g: number;
    b: number;
    a?: number;
    paletteId?: number;
}

