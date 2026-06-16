import { getContext } from "@/features/infrastructure/client";
import { GradientStopsDto } from "./gradient-dto";

export const getGradientStopsByGradientIdAsync = async (gradientId: number) => {
    const db = await getContext();
    try {
        return await db.select<GradientStopsDto[]>(`
            SELECT * FROM gradient_stop gs
            INNER JOIN gradient_layer  gl on  gl.id = gs.layerId
            WHERE  gs.deleted = 0 
            AND gl.gradientId = (?)
            `, [gradientId]);
    } catch (error) {
        console.error("Error getting gradients stops by gradient id:", error);
        throw error;
    }
}
