import { useHexHopStore } from "@/store/use-hex-hop-store";

/**
 * Attempts to remove all stored data and clears the color block state on success.
 *
 * @returns An empty array if cleanup fails; otherwise, `undefined`
 */
export async function removeAllData() {
    try {
//         const db = await getContext();

//         await db.execute(`
//             BEGIN TRANSACTION;
//             DELETE FROM palette;
//             DELETE FROM color;
//             DELETE FROM gradient;
//             DELETE FROM gradient_layer;
//             DELETE FROM gradient_stop;
//             DELETE FROM block;
//             COMMIT;
//   `);


    } catch (error) {
        console.error("Failed to remove all data:", error);
        return [];
    }

    useHexHopStore.getState().actions.setColorBlock([]);
}