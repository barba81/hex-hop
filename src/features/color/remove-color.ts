import { updateAllBlocks } from "../common/update-all-blocks";
import { getContext } from "../infrastructure/client";
import { ColorEntity } from "../infrastructure/entity/color.entity";
import { useHexHopStore } from "@/store/use-hex-hop-store";

export const removeColor = async (colorEntity: ColorEntity) => {
    try {
        const state = useHexHopStore.getState();
        const colorBlocks = state.colorBlocks;
        const newColoBlocks = state.colorBlocks.filter(x => x.id !== colorEntity.id);
        await updateAllBlocks(newColoBlocks, colorBlocks);

        const db = await getContext();
        await db.execute(
            'DELETE FROM  color WHERE id = $1',
            [colorEntity.id]
        );
        await db.execute(
            'DELETE FROM  block WHERE id = $1',
            [colorEntity.blockId]
        );

        state.actions.removeColorBlock(colorEntity.id);
 
    } catch (error) {
        console.error("Failed to remove color:", error);
    }
}