import { ColorSpaceType } from "../enum/color-space.enum";
import { EasingFunctionType } from "../enum/easing-function";
import { GradientTypes } from "../enum/gradient-types.enum";



export type GradientEntity =  {
    kind: "gradient",
    id: number;
    blockId:number;
    order: number;
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
