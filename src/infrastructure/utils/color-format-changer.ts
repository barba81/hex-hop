import type { ColorData } from "@/infrastructure/models/types";
import { parse } from "culori";

export function colorStringToData(colorString: string){
  const color  = parse(colorString);
  if (!color) {
    throw new Error("Invalid color string");
  }

  return color;
}

export function colorDataToRoundData(color: ColorData){
  return {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    a: color.a
  } as ColorData;
}

export function colorDataToCss(color: ColorData){

const colorHexData = {
    r: Math.round(color.r*255),
    g: Math.round(color.g*255),
    b: Math.round(color.b*255),
    a: color.a
  } as ColorData;
  return `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`;
}

