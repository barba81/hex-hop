
export const getGradientLayersByIdAsync = async () => {
    try {
        // const layer = await db.select<GradientLayerDto[]>(`SELECT * FROM gradient_layer gl WHERE gl.id = (?) AND  gl.deleted = 0 `, [layerId]);
        // if (!layer || layer.length === 0) {
        //     throw new Error(`Gradient layer with ID ${layerId} not found or has been deleted.`);
        // }
        // return layer[0];
    } catch (error) {
        console.error("Error getting gradients by gradient id:", error);
        throw error;
    }
}

export const getGradientLayersByGradientIdAsync = async () => {
   
}

export const getAllGradientLayersAsync = async () => {

}

export const insertGradientLayerAsync = async () => {

   
}

