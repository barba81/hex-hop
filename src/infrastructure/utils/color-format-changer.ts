import type { ColorData } from "@/infrastructure/models/types";
import { formatCss, parse } from "culori";

export function colorStringToData(colorString: string){
  const color  = parse(colorString);
  if (!color) {
    throw new Error("Invalid color string");
  }

  return color;
}

export function coloBackground(color: ColorData){
  return formatCss({...color, alpha: color.alpha??1, mode:"rgb"});
}

export function colorDataToRoundData(color: ColorData){
  return {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    alpha: color.alpha
  } as ColorData;
}

export function colorDataToCss(color: ColorData){

const colorHexData = {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    alpha: color.alpha
  } as ColorData;
  return `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.alpha ?? 1.0})`;
}

