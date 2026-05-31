import { getContext } from "../infrastructure/client";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteEntity } from "../infrastructure/entity/palette.entity";

const getNextOrderNumber = () => {
  return useHexHopStore.getState().colorBlocks.length;
};
export const addNewPalette = async () => {
  try {
    const db = getContext();
    const order = getNextOrderNumber();
    const paletteName = "New Palette";

    const blockResult = await db.execute(
      `INSERT INTO block ([order]) VALUES (?)`,
      [order],
    );

    if (!blockResult.lastInsertId) throw new Error("Failed to insert block");
    const blockId = blockResult.lastInsertId;

    const paletteResult = await db.execute(
      `INSERT INTO palette (name, blockId) VALUES (?, ?)`,
      [paletteName, blockId],
    );

    if (!paletteResult.lastInsertId)
      throw new Error("Failed to insert palette");

    const model: PaletteEntity = {
      kind: "palette",
      id: paletteResult.lastInsertId,
      name: paletteName,
      blockId,
      order,
    };

    useHexHopStore.getState().actions.addColorBlock(model);
  } catch (error) {
    console.error("Failed to add new palette:", error);
  }
};
