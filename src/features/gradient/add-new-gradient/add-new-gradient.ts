import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { GradientMapper } from "@/repo/gradient/gradient-mapper";
import { insertGradient } from "@/repo/gradient/gradient-repo";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { invoke } from "@tauri-apps/api/core";

const defaultGradient: GradientEntity = {
    kind: "gradient",
    id: 0,
    blockId: 0,
    order: 0,
    name: "hello ",
    paletteId: 0,

    layers: [],
}


export const addNewGradient = async () => {
    insertGradient(defaultGradient);
}

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
