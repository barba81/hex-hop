import { useHexHopStore } from "@/store/use-hex-hop-store";
import { useGradientStore } from "@/store/use-gradient-store";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { getContext } from "@/features/infrastructure/client";
import { insertGradientEntity } from "@/repo/gradient/gradient-repo";
import { getGradientById } from "../get-gradient-by-id/getGradientById";


export const addNewGradient = async () => {

    const id = await insertGradientEntity();
    const gradinet = await getGradientById(id);

}

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
