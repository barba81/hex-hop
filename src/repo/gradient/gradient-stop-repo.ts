
export const getGradientStopsByIdAsync = async () => {
    // const db = await getContext();
    // try {
    //     const stops = await db.select<GradientStopsDto[]>(`
    //         SELECT * FROM gradient_stop gs
    //         WHERE  gs.deleted = 0 
    //         AND gs.id = (?)
    //         `, [stopId]);
    //     if (!stops || stops.length === 0) {
    //         throw new Error(`Gradient stop with ID ${stopId} not found or has been deleted.`);
    //     }

    //     return stops[0];

    // } catch (error) {
    //     console.error("Error getting gradients stops by gradient layer id:", error);
    //     throw error;
    // }
}


export const getGradientStopsByGradientIdAsync = async () => {
    // const db = await getContext();
    // try {
    //     return await db.select<GradientStopsDto[]>(`
    //         SELECT * FROM gradient_stop gs
    //         INNER JOIN gradient_layer  gl on  gl.id = gs.layerId
    //         WHERE  gs.deleted = 0 
    //         AND gl.gradientId = (?)
    //         `, [gradientId]);
    // } catch (error) {
    //     console.error("Error getting gradients stops by gradient id:", error);
    //     throw error;
    // }
}


export const getGradientStopsByLayerIdAsync = async () => {
    try {
        // return await db.select<GradientStopsDto[]>(`
        //     SELECT * FROM gradient_stop gs
        //     WHERE  gs.deleted = 0 
        //     AND gs.layerId = (?)
        //     `, [layerId]);
    } catch (error) {
        console.error("Error getting gradients stops by gradient layer id:", error);
        throw error;
    }
}
