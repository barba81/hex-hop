import { invoke } from "@tauri-apps/api/core";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";



export const getGradientByIdAsync = async () => {
    try {


    } catch (error) {
        console.error("Error getting gradient:", error);
        throw error;
    }
}

export const getAllGradientsAsync = async () => {

    try {
    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}



export const removeGradientAsync = async () => {

    try {
        

    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}

export const insertGradient = async (gradientEntity: GradientEntity) => {
    try {
       return await invoke<number>("save_gradient", {
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