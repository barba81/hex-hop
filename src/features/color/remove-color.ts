import { getContext } from "../infrastructure/client";
import { ColorEntity } from "../infrastructure/entity/color.entity";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { updatePaletteOrder } from "../common/update-order";

export const removeColor = async (colorEntity: ColorEntity) => {
    try {

        const db = getContext();
        await db.execute(
            'DELETE FROM  color WHERE id = $1',
            [colorEntity.id]
        );
        await db.execute(
            'DELETE FROM  block WHERE id = $1',
            [colorEntity.blockId]
        );

        useHexHopStore.getState().actions.removeColorBlock(colorEntity.id);

        updatePaletteOrder(colorEntity.paletteId);
    } catch (error) {
        console.error("Failed to remove color:", error);
    }
}