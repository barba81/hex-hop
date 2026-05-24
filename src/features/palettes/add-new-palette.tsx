import { getContext } from "../infrastructure/client";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteEntity } from "../infrastructure/domain/palette.entity";

const getNextOrderNumber = () => {
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

    const model: PaletteEntity = {
      children: [],
      id: result.lastInsertId,
      name: paletteName,
      order,
    };

    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to fetch all data:", error);
  }
};
