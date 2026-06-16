import { getContext } from "@/features/infrastructure/client";
import { GradientLayerDto } from "./gradient-dto";
import { GradientLayerEntity } from "@/features/infrastructure/entity/gradient.entity";

export const getGradientLayersByIdAsync = async (layerId: number) => {
    const db = await getContext();
    try {
        const  layer = await db.select<GradientLayerDto[]>(`SELECT * FROM gradient_layer gl WHERE gl.id = (?) AND  gl.deleted = 0 `, [layerId]);
         if (!layer || layer.length === 0) {
            throw new Error(`Gradient layer with ID ${layerId} not found or has been deleted.`);
        }
        return layer[0];
    } catch (error) {
        console.error("Error getting gradients by gradient id:", error);
        throw error;
    }
}

export const getGradientLayersByGradientIdAsync = async (gradientId: number) => {
    const db = await getContext();
    try {
        return  await db.select<GradientLayerDto[]>(`SELECT * FROM gradient_layer gl WHERE gl.gradientId = (?) AND  gl.deleted = 0 `, [gradientId]);
    } catch (error) {
        console.error("Error getting gradients by gradient id:", error);
        throw error;
    }
}

export const getAllGradientLayersAsync = async () => {
    const db = await getContext();
    
    try {
        return await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer gl WHERE gl.deleted = 0');
    } catch (error) {
        console.error("Error getting all gradient layers:", error);
        throw error;
    }
}


export const insertGradientLayerAsync = async (gradientLayer: GradientLayerEntity , gradientId: number) => {
    const db = await getContext();

    try {
        return await db.execute(`
            INSERT INTO 
            gradient_layer 
            (gradientId, gradientType, rotationDegree, patternRepeatNumber, colorSpace, easingFunction ) 
            VALUES 
            (?,?,?,?,?,?) `,
            [gradientId, gradientLayer.gradientType, gradientLayer.rotationDegree, gradientLayer.patternRepeatNumber, gradientLayer.colorSpace, gradientLayer.easingFunction]);
    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}

