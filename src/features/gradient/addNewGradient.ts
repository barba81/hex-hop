import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import { GradientEntity } from "../infrastructure/entity/gradient.entity";
import { useGradientStore } from "@/store/use-gradient-store";


export const addNewGradient = async () => {
    try {
        const db = getContext();
        const order = getNextOrderNumber();
        const gradientName = "New gradient";

        const blockResult = await db.execute(
            `INSERT INTO block ([order]) VALUES (?)`,
            [order],
        );
        if (!blockResult.lastInsertId) throw new Error("Failed to insert block");
        const blockId = blockResult.lastInsertId;

        const result = await db.execute(
            `
            INSERT into gradient (paletteId, name, blockId)
            values (?, ?, ?);`,
            [null, gradientName, blockId],
        );

        if (!result.lastInsertId) throw new Error("Failed to insert palette");

        const entity: GradientEntity = {
            id: result.lastInsertId,
            blockId: blockId,
            paletteId: null,
            kind: 'gradient',
            order: order,
            name: gradientName,
            layers: []
        };

        useGradientStore.getState().actions.addGradient(entity);

    } catch (error) {
        console.error("Error adding gradient:", error);
    }
}

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
