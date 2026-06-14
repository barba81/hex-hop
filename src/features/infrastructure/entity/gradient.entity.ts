import { ColorSpace } from "../enum/color-space.enum";
import { GradientTypes } from "../enum/gradient-types.enum";

export type GradientEntity =  {
    kind: "gradient",
    id: number;
    blockId:number;
    order: number;
    name: string;
    paletteId: number | null;
    
    layers: GradientLayer[];
}

export type GradientLayer =  {
    id: number;
    order: number;
    gradientType: GradientTypes;
    rotationDegree: number;
    patternRepeatNumber: number;
    colorSpace: ColorSpace;
    easingFunction: number;

    stops: GradientStop[];
}

export type GradientStop = {
    id: number;
    order: number;
    layerId: number;
    r: number;
    g: number;
    b: number;
    a: number;
    position: number;
}