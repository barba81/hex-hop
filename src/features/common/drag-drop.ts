import { ColorBlock, useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteEntity } from "../infrastructure/entity/palette.entity";
import { GradientEntity } from "../infrastructure/entity/gradient.entity";
import { updateAllBlocks } from "./update-all-blocks";

export const dropNewPosition = async (blockId: number, targetParentId: number | null, orderId?: number) => {
    const { colorBlocks, actions } = useHexHopStore.getState();
    const blockToMove =
        colorBlocks.find(x => x.blockId === blockId);

    if (!blockToMove) return;

    const insertAt = (orderId ?? colorBlocks.length) - 0.5;

    const updatedBlock = blockToMove.kind !== 'palette'
        ? { ...blockToMove, paletteId: targetParentId, order: insertAt } as ColorBlock | GradientEntity
        : { ...blockToMove, order: insertAt } as PaletteEntity;

    const withUpdated = colorBlocks
        .filter(x => x.blockId !== blockId)
        .concat(updatedBlock);

    const mapOrder = new Map<number | null | undefined, number>();

    const reindexed = withUpdated
        .sort((a, b) => a.order - b.order)
        .map(x => {
            const paletteId = x.kind !== 'palette' ? x.paletteId : null;
            const next = mapOrder.get(paletteId) ?? 0;
            mapOrder.set(paletteId, next + 1);
            return { ...x, order: next };
        });

    actions.setColorBlock(reindexed);
    await updateAllBlocks(reindexed, colorBlocks);
}

