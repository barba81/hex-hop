import { useHexHopStore } from "@/store/use-hex-hop-store";
import { ColorEntity } from "../infrastructure/entity/color.entity";
import { getContext } from "../infrastructure/client";

export const updateColor = async (colorEntity: ColorEntity) => {
    const db = getContext();
    await db.execute(
        'UPDATE colors SET  [order] = $2, name = $3, r = $4, g = $5, b = $6, a= $7, paletteId = $8  WHERE id = $1   ',
        [
            colorEntity.id, 
            colorEntity.order, 
            colorEntity.name, 
            colorEntity.r, 
            colorEntity.g, 
            colorEntity.b,
            colorEntity.a, 
            colorEntity.paletteId
        ]
    );

    useHexHopStore.getState().actions.updateColorBlock(colorEntity);
}