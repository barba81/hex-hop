import { getContext } from "@/features/infrastructure/client";
import { GradientLayerDto } from "./gradient-dto";

export const getAllGradientLayersAsync = async () => {
    const db = await getContext();

    try {
        return await db.select<GradientLayerDto[]>('SELECT * FROM gradient');
    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}