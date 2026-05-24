import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import { ColorData } from "./types";
import { getNearestColorName } from "./color-name-suggestion";
import { ColorModel } from "../infrastructure/domain/color.model";

const getNextOrderNumber = () => {
  return useHexHopStore.getState().colorBlocks.length;
};

export const addNewColor = async (color: ColorData, paletteId?: number) => {
  try {
    const db = getContext();
    const order = getNextOrderNumber();
    const colorName = await getNearestColorName(color);

    const result = await db.execute(
      `
      INSERT INTO 
      colors ([order], paletteId, r,g,b,a, name) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [order, paletteId, color.r, color.g, color.b, color.a, colorName],
    );
    if (!result.lastInsertId) throw new Error("Failed to insert palette");

    const model: ColorModel = {
      id: result.lastInsertId,
      order: order,
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
      name: colorName,
    };
    debugger;
    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
    return [];
  }
};
