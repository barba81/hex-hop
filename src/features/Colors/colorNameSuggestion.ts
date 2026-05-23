import { oklab } from "culori";
import { ColorData } from "./types";

let colorData: [number, number, number, string][] | null = null;


export async function initColorLookup(): Promise<void> {
  if (colorData) return;

  const response = await fetch("/data/colorsOptimized.json");
  colorData = await response.json();
}


export async function getNearestColor(color: ColorData): Promise<string> {
  if (!colorData) {
    throw new Error("Color lookup has not been initialized. Call initColorLookup() first.");
  }

  const query = oklab(color);
  if (!query) return "";

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