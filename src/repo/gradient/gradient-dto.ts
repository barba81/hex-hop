
export type GradientDto = {
    id: number;
    blockId:number;
    order: number;
    paletteId: number;
    name: string;
}


export type GradientLayerDto = {
    id: number;
    order: number;
    gradientId: number;
    gradientType: number;
    rotationDegree: number;
    patternRepeatNumber: number;
    colorSpace:number;
    easingFunction: number;
}


export type GradientStopsDto = {
    id: number;
    order: number;
    layerId: number;
    r: number;
    g: number;
    b: number;
    a: number;
    position: number;
}
