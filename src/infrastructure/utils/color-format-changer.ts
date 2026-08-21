import type { ColorData } from "@/infrastructure/models/types";
import { Color, formatCss, formatHex, formatHex8, parse, rgb } from "culori";
import type { ColorEntity } from "../models/entity";


export const randomColor = () => {
  const randomHex = formatHex({
  mode: 'rgb',
  r: Math.random(),
  g: Math.random(),
  b: Math.random()
});
  return  colorStringToData(randomHex); 
}


export function colorStringToData(colorString: string){
  const color  = parse(colorString);
  if (!color) {
    throw new Error("Invalid color string");
  }
  return color;
}

export function coloBackground(color: ColorData){
  return formatCss({...color, alpha: color.alpha ?? undefined, mode:"rgb"});
}

export function toHex8(color: ColorData ){
  return formatHex8({...color, alpha: color.alpha ?? undefined, mode:"rgb"});
}


export function colorEntityToRoundedEntity(color: ColorEntity){
  return {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    name: color.name,
    alpha: color.alpha,
  }  as ColorData;
}

export function hexaToRgbaNormalized(hexaString: string) {
  const parsed = rgb(hexaString);
  if (!parsed) return null;

  return {
    r: parsed.r ?? 0,     
    g: parsed.g ?? 0,      
    b: parsed.b ?? 0,     
    alpha: parsed.alpha ?? 1, 
  };
}

export function colorEntityToColor(colorEntity: ColorData ){
  return {
    ...colorEntity,
    alpha: colorEntity.alpha ?? undefined,
    mode: "rgb",
  }  as Color;
}
