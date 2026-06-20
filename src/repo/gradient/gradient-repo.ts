import { getContext } from "@/features/infrastructure/client";
import { GradientDto } from "./gradient-dto";
import { invoke } from "@tauri-apps/api/core";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";



export const getGradientByIdAsync = async (gradientId: number) => {
    const db = await getContext();
    try {
        const gradients = await db.select<GradientDto[]>(`SELECT * FROM gradient g WHERE g.id =  (?) AND  g.deleted = 0; `, [gradientId]);

        if (!gradients || gradients.length === 0) {
            throw new Error(`Gradient with ID ${gradientId} not found or has been deleted.`);
        }

        return gradients[0];

    } catch (error) {
        console.error("Error getting gradient:", error);
        throw error;
    }
}

export const getAllGradientsAsync = async () => {
    const db = await getContext();

    try {
        return await db.select<GradientDto[]>('SELECT * FROM gradient');
    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}



export const removeGradientAsync = async (selectedGradientId: number) => {
    const db = await getContext();

    try {
        await db.execute(`
            UPDATE gradient
            SET deleted =  1
            WHERE id =  (?);
            `, [selectedGradientId]);

    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}

export const insertGradient = async (gradientEntity: GradientEntity) => {
    try {
        await invoke("save_gradient", {
            gradient: {
                order: gradientEntity.order,
                name: gradientEntity.name,
                palette_id: null,
                layers: gradientEntity.layers.map(layer => ({
                    order: layer.order,
                    gradient_type: layer.gradientType,
                    rotation_degree: layer.rotationDegree,
                    pattern_repeat_number: layer.patternRepeatNumber,
                    color_space: layer.colorSpace,
                    easing_function: layer.easingFunction,
                    stops: layer.stops.map(stop => ({
                        order: stop.order,
                        r: stop.r,
                        g: stop.g,
                        b: stop.b,
                        a: stop.a,
                        position: stop.position,
                    }))
                }))
            }
        });
    } catch (error) {
        console.error("save_gradient failed:", error);
        throw error;
    }
};