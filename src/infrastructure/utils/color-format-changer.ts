import type { ColorData } from "@/infrastructure/models/types";
import { Color, formatCss, formatHex8, parse, rgb } from "culori";
import type { ColorEntity } from "../models/entity";


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
    alpha: color.alpha?.toFixed(2),
  }  as ColorData;
}

export function hexaToRgbaNormalized(hexaString: string) {
  const parsed = rgb(hexaString);
  if (!parsed) return null;

  return {
    r: parsed.r ?? 0,      // 0..1
    g: parsed.g ?? 0,      // 0..1
    b: parsed.b ?? 0,      // 0..1
    a: parsed.alpha ?? 1,  // 0..1 (defaults to 1 if no alpha in HEX)
  };
}

export function colorEntityToColor(colorEntity: ColorData ){
  return {
    ...colorEntity,
    alpha: colorEntity.alpha ?? undefined,
    mode: "rgb",
  }  as Color;
}
