// Palette

export type PaletteDto = {
    id: number;
    order: number;
    name: string;
    blockId:number;
}

// Color

export type ColorDto = {
    id: number;
    order: number;
    paletteId: number;
    blockId:number;
    r: number;
    g: number;
    b: number;
    a: number;
    name: string;
}


// Gradient

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
