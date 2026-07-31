import { ColorEntity } from "@/infrastructure/entity";
import { useHexHopStore } from "@/store/use-hex-hop-store";

export const updateColor = async (colorEntity: ColorEntity) => {
    // const db = await getContext();
    // await db.execute(
    //     'UPDATE color SET name = $2, r = $3, g = $4, b = $5, a= $6, paletteId = $7  WHERE id = $1   ',
    //     [
    //         colorEntity.id, 
    //         colorEntity.name, 
    //         colorEntity.r, 
    //         colorEntity.g, 
    //         colorEntity.b,
    //         colorEntity.a, 
    //         colorEntity.paletteId
    //     ]
    // );

    useHexHopStore.getState().actions.updateColorBlock(colorEntity);
}