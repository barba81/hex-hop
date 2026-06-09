import { ColorBlockEntity } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";

export const updateAllBlocks = async (newLIst: ColorBlockEntity[], _: ColorBlockEntity[]) => {

    try {
        const db = getContext();
        newLIst.forEach(async (colorEntity) => {
            if (colorEntity.kind === 'color') {
                await db.execute(
                    `UPDATE color SET paletteId = $2  WHERE id = $1   `,
                    [
                        colorEntity.id,
                        colorEntity.paletteId,
                    ]
                );
            }
            await db.execute(
                `UPDATE block SET [order] =  $2  WHERE id =  $1 `,
                [
                    colorEntity.blockId,
                    colorEntity.order,
                ]
            );

        })
    } catch (error) {
        console.error("Update all blocks:", error);
    }
}