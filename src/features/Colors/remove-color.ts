import { getContext } from "../infrastructure/client";
import { ColorEntity } from "../infrastructure/entity/color.entity";
import { useHexHopStore } from "@/store/use-hex-hop-store";

export const removeColor = async (colorEntity: ColorEntity) => {
    const db = getContext();
    await db.execute(
        'DELETE FROM  colors WHERE id = $1  ',
        [colorEntity.id]
    );

    useHexHopStore.getState().actions.removeColorBlock(colorEntity.id);
}