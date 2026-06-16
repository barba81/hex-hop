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


export const insertGradientEntity = async () => {
    return new Promise<number>((resolve) => {
        resolve(6);
    });

    //    const db = await getContext();


    //     try {
    //         await db.execute(`BEGIN TRANSACTION;


    //             `);

    //         const order = getNextOrderNumber();

    //         const blockResult = await db.execute(
    //             `INSERT INTO block ([order]) VALUES (?)`, 
    //             [order]
    //         );
    //         const blockId = blockResult.lastInsertId;

    //         const result = await db.execute(
    //             `INSERT into gradient (paletteId, name, blockId) values (?, ?, ?);`,
    //             [null, gradientEntity.name, blockId],
    //         );
    //         const gradientId = result.lastInsertId;
    // debugger
    //         // Combine with Bulk Insert for ultimate performance
    //         if (gradientEntity.layers.length > 0) {
    //             const placeholders = gradientEntity.layers.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(', ');
    //             const values = gradientEntity.layers.flatMap(layer => [
    //                 layer.id, layer.order, gradientId, layer.gradientType,
    //                 layer.rotationDegree, layer.patternRepeatNumber, layer.colorSpace, layer.easingFunction
    //             ]);

    //             await db.execute(`
    //                 INSERT INTO gradient_layer (id, "order", gradientId, gradientType, rotationDegree, patternRepeatNumber, colorSpace, easingFunction) 
    //                 VALUES ${placeholders};
    //             `, values);
    //         }

    //         // Commit everything if we made it here safely
    //         await db.execute("COMMIT;");

    //     } catch (error) {
    //         // Something went wrong, revert all changes
    //         await db.execute("ROLLBACK;");
    //         console.error("Transaction aborted and rolled back:", error);
    //         throw error;
    //     }
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