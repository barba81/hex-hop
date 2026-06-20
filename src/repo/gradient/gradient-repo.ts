import { getContext } from "@/features/infrastructure/client";
import { GradientDto } from "./gradient-dto";



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

export const insertGradient = async (gradientDto: GradientDto) => {
    const db = await getContext();
    try {
        await db.execute(`
         BEGIN TRANSACTION; 

        INSERT INTO block ([order])
                    VALUES (?);

        INSERT INTO gradient (name, paletteId, blockId) 
                    VALUES (?, ?, last_insert_rowid());
			
        COMMIT;
            `, [gradientDto.order, gradientDto.name, null]);

    } catch (error) {
        console.error("Transaction aborted and rolled back:", error);
        throw error;
    }
}
