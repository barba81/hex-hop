import type { ColorSpaceType, EasingFunctionType, GradientTypes } from "./enum";


export type BlockEntity = (PaletteEntity | ColorEntity | GradientEntity);

export type PaletteEntity =  {
    kind: "palette",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;

    blocks: (PaletteEntity| ColorEntity | GradientEntity)[];
}

export type ColorEntity =  {
    kind: "color",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
    r: number;
    g: number;
    b: number;
    a?: number;
    paletteId?: number;
}

export type GradientEntity =  {
    kind: "gradient",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
    paletteId: number | null;
    
    layers: GradientLayerEntity[];
}

export type GradientLayerEntity =  {
    id: number;
    order: number;
    gradientType: GradientTypes;
    rotationDegree: number;
    patternRepeatNumber: number;
    colorSpace: ColorSpaceType;
    easingFunction: EasingFunctionType;
    stops: GradientStopEntity[];
}

export type GradientStopEntity = {
    id: number;
    order: number;
    r: number;
    g: number;
    b: number;
    a: number;
    position: number;
}
