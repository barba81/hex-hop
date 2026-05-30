import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import { ColorData } from "./types";
import { getNearestColorName } from "./color-name-suggestion";
import { ColorEntity } from "../infrastructure/entity/color.entity";

const getNextOrderNumber = () => {
  return useHexHopStore.getState().colorBlocks.length;
};

export const addNewColor = async (color: ColorData, paletteId?: number) => {
  try {
    const db = getContext();
    const order = getNextOrderNumber();
    const colorName = await getNearestColorName(color);
  
   const blockResult = await db.execute(
      `INSERT INTO block ([order]) VALUES (?)`,
      [order],
    );
  
      if (!blockResult.lastInsertId) throw new Error("Failed to insert block");
    const blockId = blockResult.lastInsertId;

    const result = await db.execute(
      `
      INSERT INTO 
      color (blockId, paletteId, r,g,b,a, name) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [blockId, paletteId, color.r, color.g, color.b, color.a, colorName],
    );
    if (!result.lastInsertId) throw new Error("Failed to insert palette");

    const model: ColorEntity = {
      id: result.lastInsertId,
      blockId: blockId,
      paletteId: paletteId,
      kind: 'color',
      order: order,
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
      name: colorName,
    };

    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
    return [];
  }
};
