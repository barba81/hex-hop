import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";

export async function removeAllData() {
    try {
        const db = await getContext();

        await db.execute(`
            BEGIN TRANSACTION;
            DELETE FROM palette;
            DELETE FROM color;
            DELETE FROM gradient;
            DELETE FROM gradient_layer;
            DELETE FROM gradient_stop;
            DELETE FROM block;
            COMMIT;
  `);


    } catch (error) {
        console.error("Failed to remove all data:", error);
        return [];
    }

    useHexHopStore.getState().actions.setColorBlock([]);
}