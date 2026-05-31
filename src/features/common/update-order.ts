import { ColorBlock, useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import _ from "lodash";


export const updatePaletteOrder = async (paletteId?: number) => {
    const colorBlocks = useHexHopStore.getState().colorBlocks;

    let newOrder = 0;
    const listOfIds: { id: number; order: number }[] = [];
    if (!paletteId) {
        colorBlocks.forEach(x => {
            if (x.order !== newOrder) {
                x.order = newOrder;
                listOfIds.push({ id: x.blockId, order: x.order });
            }
            newOrder++;
        });
    } else {
        const colorBlock = colorBlocks.find(x => x.id === paletteId);
        if (colorBlock && colorBlock.kind === 'palette') {
            colorBlock.children.forEach(x => {
                if (x.order !== newOrder) {
                    x.order = newOrder;
                    listOfIds.push({ id: x.blockId, order: x.order })
                }
                newOrder++;
            });
        }
    }
    if (listOfIds.length === 0) return;

    try {
        const db = getContext();

        for (const item of listOfIds) {
            db.execute(
                `UPDATE block SET [order] = ? WHERE id = ?`,
                [item.order, item.id]
            );
        }
    } catch (error) {
        console.error("Failed to update palette order:", error);
    }
}


export const updateInsertToNewPosition = async (blockId: number, targetParentId?: number, orderId?: number) => {
    const { colorBlocks, actions } = useHexHopStore.getState();

    const blockToMove =
        colorBlocks.find(x => x.blockId === blockId) ??
        colorBlocks
            .filter(x => x.kind === 'palette')
            .flatMap(x => x.children)
            .find(x => x.blockId === blockId);
    


    if (!blockToMove) return;

    if(blockToMove.kind === 'color'){
        blockToMove.paletteId = targetParentId;
    }

    const colorBlocksWithoutTarget = colorBlocks
        .filter(x => x.blockId !== blockId)
        .map(x =>
            x.kind === 'palette'
                ? { ...x, children: x.children.filter(c => c.blockId !== blockId) }
                : x
        );

    if (!targetParentId) {
        // add to root
        const insertAt = orderId ?? colorBlocksWithoutTarget.length;

        const updated = [...colorBlocksWithoutTarget, { ...blockToMove, order: insertAt - 0.5 }]
            .sort((a, b) => a.order - b.order)
            .map((x, i) => ({ ...x, order: i }));

        actions.setColorBlock(updated);
    } else {
        if (blockToMove.kind === 'palette') return;

        const updated = colorBlocksWithoutTarget.map(x => {
            if (x.kind !== 'palette' || x.id !== targetParentId) return x;

            const insertAt = orderId ?? x.children.length;

            const reindexedChildren = [...x.children, { ...blockToMove, order: insertAt - 0.5 }]
                .sort((a, b) => a.order - b.order)
                .map((c, i) => ({ ...c, order: i }));

            return { ...x, children: reindexedChildren };
        });

        actions.setColorBlock(updated);
    }
    const newColorBlocks = useHexHopStore.getState().colorBlocks;

    const colorBlockById = groupColorBlocks(colorBlocks);
    const newColorBlockById = groupColorBlocks(newColorBlocks);

    const changedBlocks = Object.values(newColorBlockById).filter(newBlock => {
        const oldBlock = colorBlockById[newBlock.blockId];
        if (!oldBlock) return true;
        console.log(oldBlock.order, newBlock.order);
        if (oldBlock.kind === 'color' && newBlock.kind === 'color') {
            return (
                oldBlock.order !== newBlock.order ||
                oldBlock.paletteId !== newBlock.paletteId
            );
        }

        return oldBlock.order !== newBlock.order;
    });
    try {
        const db = getContext();

        for (const block of changedBlocks) {
            if (block.kind === 'color') {
                await db.execute(
                    `UPDATE color SET paletteId = ? WHERE id = ?`,
                    [block.paletteId, block.id]
                );
            }
            
            await db.execute(
                `UPDATE block SET [order] = ? WHERE id = ?`,
                [block.order, block.blockId]
            );
        }
    } catch (error) {
        console.error("Failed to update palette order:", error);
    }
}


export const groupColorBlocks = (colorBlocks: ColorBlock[]) => {
    const colorBlocksById = _.keyBy(colorBlocks, "blockId");
    colorBlocks.forEach(x => {
        if (x.kind === 'palette') {
            Object.assign(colorBlocksById, _.keyBy(x.children, "blockId"));
        }
    })

    return colorBlocksById;
}