import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";

export const updatePaletteOrder = (paletteId?: number) => {
    const colorBlocks = useHexHopStore.getState().colorBlocks;

    let newOrder = 0;
    const listOfIds = [];
    if (paletteId === undefined) {
        colorBlocks.forEach(x => { x.order = newOrder++; listOfIds.push({ id: x.id, order: x.order }) });
    } else {
        const colorBlock = colorBlocks.find(x => x.id === paletteId);
        if (colorBlock && colorBlock.kind === 'palette') {
            colorBlock.children.forEach(x => { x.order = newOrder++; listOfIds.push({ id: x.id, order: x.order }) });
        }
    }

    try {
        const db = getContext();
        db.execute(`
            UPDATE my_table AS t
            SET order_column = v.new_order
            FROM (VALUES 
                (1, 10),  -- (id, new_order) from item 1
                (2, 20),  -- (id, new_order) from item 2
                (3, 30)   -- (id, new_order) from item 3
            ) AS v(id, new_order)
            WHERE t.id = v.id;
            `, []);
    } catch (error) {
        console.error("Failed to update palette order:", error);
    }
}