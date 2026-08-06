import type { GradientEntity } from "@/infrastructure/entity";

export const gradientToCssString = (gradient: GradientEntity) => {
    const sol =  gradient.layers
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((layer) => {
      // 1. Sort stops by order
      const formattedStops = layer.stops
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((stop) => `rgba(${Math.round( stop.r*255)}, ${stop.g*255}, ${stop.b*255}, ${stop.a}) ${stop.position*100}%`)
        .join(', ');

      // 2. Format based on gradient type
      const type = layer.gradientType.toLowerCase();

      if (type.includes('radial')) {
        return `radial-gradient(circle, ${formattedStops})`;
      }
      if (type.includes('conic')) {
        return `conic-gradient(from ${layer.rotationDegree ?? 0}deg, ${formattedStops})`;
      }
      
      // Default: linear-gradient
      return `linear-gradient(${layer.rotationDegree ?? 0}deg, ${formattedStops})`;
    })
    .join(', ');
    console.log(sol);
return sol;

}