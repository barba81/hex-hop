import { useHexHopStore } from "@/store/use-hex-hop-store";
import { useGradientStore } from "@/store/use-gradient-store";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { getContext } from "@/features/infrastructure/client";
import { insertGradientEntity } from "@/repo/gradient/gradient-repo";
import { getGradientById } from "../get-gradinet-by-id/getGradinetById";


export const addNewGradient = async () => {
    
    await insertGradientEntity();
const gradinet = await getGradientById(1);
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

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
