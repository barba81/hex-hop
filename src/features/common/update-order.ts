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


export const updateInsertToNewPosition = (blockId: number, targetParentId: number, orderId: number) =>{
const { colorBlocks, actions } = useHexHopStore.getState();

    const colorBlock = colorBlocks.find((x) => x.blockId === blockId);
    if (colorBlock === undefined) return;

    const updated = colorBlocks.map((x) =>
        x.blockId === blockId ? { ...x, order: orderId - 0.5 } : { ...x }
    );

    const reindexed = updated
        .sort((a, b) => a.order - b.order)
        .map((x, i) => ({ ...x, order: i }));

    actions.setColorBlock(reindexed);
}