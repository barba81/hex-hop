import { oklab } from "culori";

export class ColorLookupName {
  private static colorData: any;

  public static async addColorNameLookup() {
    const response = await fetch("/data/colorsOptimized.json");
    ColorLookupName.colorData = await response.json();
  }

  public static async nearestColor(color: string) {
    let query = oklab(color);
    if (!query) return "";
    let minDist = Infinity;
    let nearest = "";
    for (const p of  ColorLookupName.colorData) {
      const d = Math.hypot(p[0] - query.l, p[1] - query.a, p[2] - query.b);
      if (d < minDist) {
        minDist = d;
        nearest = p;
      }
    }
    console.log(minDist);
    console.log(nearest);
  }
}
