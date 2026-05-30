import { oklab } from "culori";
import { ColorData } from "./types";
import { colorDataToHex } from "./color-format-changer";

let colorData: [number, number, number, string][] | null = null;

export async function initColorNameLookup(): Promise<void> {
  if (colorData) return;
  
  const response = await fetch("/data/colorsOptimized.json");
  colorData = await response.json();
}


export async function getNearestColorName(color: ColorData): Promise<string> {
  if (!colorData) {
    throw new Error("Color lookup has not been initialized. Call initColorLookup() first.");
  }
  const hexValue = colorDataToHex(color);
  const query = oklab(hexValue);
  if (!query) return "Color Name";

  let minDist = Infinity;
  let nearest = "";

  for (const p of colorData) {
    const d = Math.hypot(p[0] - query.l, p[1] - query.a, p[2] - query.b);
    if (d < minDist) {
      minDist = d;
      nearest = p[3];
    }
  }

  return nearest;
}