import { useHexHopStore } from "@/store/use-hex-hop-store";
import { insertGradientEntity } from "@/repo/gradient/gradient-repo";
import { getGradientById } from "../get-gradient-by-id/getGradientById";


export const addNewGradient = async () => {
    const id = await insertGradientEntity();
    const gradinet = await getGradientById(id);

}

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
