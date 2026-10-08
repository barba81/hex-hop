export type ColorData =  {
    r: number;
    g: number;
    b: number;
    alpha?: number;
    parentPaletteId?: number;
    name: string
}


export type ColorEntity =  {
    id: string;
    kind: "color",
    blockId:number;
    blockOrder: number;
} & ColorData;


export type ColorRequest = {
    id: string,
    r: number;
    g: number;
    b: number;
    alpha?: number;
    parentPaletteId?: number;
    name: string
}