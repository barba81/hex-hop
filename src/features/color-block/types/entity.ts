export type ColorData =  {
    r: number;
    g: number;
    b: number;
    alpha?: number;
    parentPaletteId?: number;
    name: string
}


export type ColorEntity =  {
    kind: "color",
    id: number;
    blockId:number;
    blockOrder: number;
} & ColorData;