import { useHexHopStore } from "@/store/use-hex-hop-store";
import { invoke } from "@tauri-apps/api/core";


export const addNewGradient = async () => {
    invoke('add_gradient', { invokeMessage: 'Hello!' })
        .then((message) => console.log(message))
        .catch((error) => console.error(error));

    // const id = await insertGradientEntity();

}

const getNextOrderNumber = () => {
    return useHexHopStore.getState().colorBlocks.length;
};
