import type { ColorSpaceType, EasingFunctionType, GradientTypes } from "./enum";


export type BlockEntity = (PaletteEntity | ColorEntity | GradientEntity);


export type PaletteEntitySummary = {
    kind: "palette",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
}

export type PaletteEntity =  {
    blocks: (ColorEntity | GradientEntity)[] | null;
} & PaletteEntitySummary;

export const  toPaletteSummary = (entity: PaletteEntity): PaletteEntitySummary => {
  const { blocks, ...summary } = entity;
  return summary;
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
    alpha?: number;
    parentPaletteId: number | null;
}

export type GradientEntitySummary = {
    kind: "gradient",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
    parentPaletteId: number | null;
}


export type GradientEntity =  {
    layers: GradientLayerEntity[];
} & GradientEntitySummary;


export const  toGradientSummary = (entity: GradientEntity): GradientEntitySummary => {
  const { layers, ...summary } = entity;
  return summary;
}

export type GradientLayerEntitySummary = {
    id: number;
    order: number;
    gradientType: GradientTypes;
    rotationDegree: number;
    patternRepeatNumber: number;
    colorSpace: ColorSpaceType;
    easingFunction: EasingFunctionType;
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
    alpha: number;
    position: number;
}
