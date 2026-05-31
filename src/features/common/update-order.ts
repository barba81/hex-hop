import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";


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


export const updateInsertToNewPosition = (blockId: number, targetParentId?: number, orderId?: number) => {
    const { colorBlocks, actions } = useHexHopStore.getState();

    const blockToMove =
        colorBlocks.find(x => x.blockId === blockId) ??
        colorBlocks
            .filter(x => x.kind === 'palette')
            .flatMap(x => x.children)
            .find(x => x.blockId === blockId);

    if (!blockToMove) return;

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

        const reindexed = [...colorBlocksWithoutTarget, { ...blockToMove, order: insertAt - 0.5 }]
            .sort((a, b) => a.order - b.order)
            .map((x, i) => ({ ...x, order: i }));

        actions.setColorBlock(reindexed);
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


    // need to update DB

    try {
        const db = getContext();

        for (const item of reindexed) {
            db.execute(
                `UPDATE block SET [order] = ? WHERE id = ?`,
                [item.order, item.blockId]
            );
        }
    } catch (error) {
        console.error("Failed to update palette order:", error);
    }
}