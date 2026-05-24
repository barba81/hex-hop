import { ColorSpace } from "../enum/color-space.enum";
import { GradientTypes } from "../enum/gradient-types.enum";

export type GradientEntity =  {
    kind: "gradient",
    id: number;
    order: number;
    name: string;
    
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

    stops: GradientStops[];
}

export type GradientStops = {
    id: number;
    order: number;
    layerId: number;
    r: number;
    g: number;
    b: number;
    a: number;
    position: number;
}