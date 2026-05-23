import { getContext } from "../Infrastructure/client";
import { useHexHopStore } from "@/store/useHexHopStore";
import { Palette } from "../Infrastructure/Domain/Palette.model";

export const GetNextOrderNumber = () => {
  return useHexHopStore.getState().colorBlocks.length;
};

export const AddNewPalette = async () => {
  try {
    const db = getContext();
    const order = GetNextOrderNumber();
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
    console.log(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
    return [];
  }
};
