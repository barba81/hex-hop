import { ColorSpaceType, EasingFunctionType, GradientTypes } from "@/features/gradient-generator/types/enum";

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
