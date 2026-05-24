// Palette

export type PaletteDto = {
    id: number;
    order: number;
    name: string;
}

// Color

export type ColorDto = {
    id: number;
    order: number;
    paletteId: number;
    r: number;
    g: number;
    b: number;
    a: number;
    name: string;
}

// Gradient

export type GradientDto = {
    id: number;
    order: number;
    paletteId: number;
    name: number;
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
