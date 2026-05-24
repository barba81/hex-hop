import { getContext } from "../Infrastructure/client";
import { useHexHopStore } from "@/store/useHexHopStore";
import { Palette } from "../Infrastructure/Domain/Palette.model";
import { ColorData, getNearestColorName } from "../Colors";
import { Color } from "../Infrastructure/Domain/Color.model";

export const getNextOrderNumber = () => {
  return useHexHopStore.getState().colorBlocks.length;
};

export const addNewPalette = async () => {
  try {

    const db = getContext();
    const order = getNextOrderNumber();
    const paletteName = "New Palette";

    const result = await db.execute(
      `INSERT INTO palette ([order], name) VALUES (?, ?)`,
      [order, paletteName],
    );

    if (!result.lastInsertId) throw new Error("Failed to insert palette");

    const model: Palette = {
      children: [],
      id: result.lastInsertId,
      name: paletteName,
      order,
    };

    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
    return [];
  }
};



export const addNewColor = async (color: ColorData, paletteId?: number) => {
  try {
    const db = getContext();
    const order = getNextOrderNumber();
    const colorName = await getNearestColorName(color);
    
    const result = await db.execute(
      `INSERT INTO colors ([order], paletteId, r,g,b,a, name) VALUES (?, ?)`,
      [order, paletteId, color.r, color.g, color.b, color.a, colorName],
    );
    if (!result.lastInsertId) throw new Error("Failed to insert palette");

    const model: Color = {
        id: result.lastInsertId,
        order: order, 
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a,
        name: colorName,
    }
   debugger;
    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
    return [];
  }
};

