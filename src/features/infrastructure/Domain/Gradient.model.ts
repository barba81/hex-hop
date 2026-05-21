export type GradientTypes = "linear" | "radial" | "conic";
export type ColorSpace = 
"oklab" | 
"oklch" | 
"srgb" | 
"shorter hue"| 
"longer hue"| 
"srgb-linear" | 
"longer hue";

export type Gradient =  {
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
    colorSpace: number;
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