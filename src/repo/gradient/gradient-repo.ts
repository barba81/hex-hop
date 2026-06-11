import { getContext } from "@/features/infrastructure/client";
import { GradientDto } from "./gradient-dto";

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

export const getAllGradientsAsync = async () => {
    const db = await getContext();

    try {
        return await db.select<GradientDto[]>('SELECT * FROM gradient');
    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}