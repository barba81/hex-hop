import { useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";

export async function removeAllData() {
    try {
        const db = getContext();

      await db.execute(`
    BEGIN TRANSACTION;
    DELETE FROM palette;
    DELETE FROM colors;
    DELETE FROM gradient;
    DELETE FROM gradient_layer;
    DELETE FROM gradient_stop;
    COMMIT;
  `);

        useHexHopStore.getState().actions.setColorBlock([]);

    } catch (error) {
        console.error("Failed to remove all data:", error);
        return [];
    }

}