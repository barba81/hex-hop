import { ColorBlock } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import _ from "lodash";

export const updateAllBlocks = async (newList: ColorBlock[], oldList: ColorBlock[]) => {
    const oldById = _.keyBy(oldList, 'blockId');

    const changedBlocks = newList.filter(newBlock => {
        const oldBlock = oldById[newBlock.blockId];
        if (!oldBlock) return true;

        if (newBlock.kind === 'color' && oldBlock.kind === 'color') {
            return newBlock.order !== oldBlock.order || 
                   newBlock.paletteId !== oldBlock.paletteId;
        }

        return newBlock.order !== oldBlock.order;
    });

    if (changedBlocks.length === 0) return;

    try {
        const db = getContext();

        for (const block of changedBlocks) {
            if (block.kind === 'color') {
                await db.execute(
                    'UPDATE color SET paletteId = $2 WHERE id = $1',
                    [block.id, block.paletteId]
                );
            }
            await db.execute(
                'UPDATE block SET [order] = $2 WHERE id = $1',
                [block.blockId, block.order]
            );
        }
    } catch (error) {
        console.error("Update all blocks:", error);
    }
};