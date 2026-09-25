import type { BlockEntity } from "@/infrastructure/models/entity";
import { useHexHopStore } from "@/store/store";
import { invoke } from "@tauri-apps/api/core";

export const deleteColorBlock = async (blockId: number, colorId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useHexHopStore.getState().deleteBlock(blockId, paletteId);

    // useColorListCommands.getState().push({
    //     async undo() {
    //         await invoke("restore_block", { blockId });
    //         const entity = await invoke<ColorEntity>("get_color", { colorId: colorId });
    //         useHexHopStore.getState().pushBlock(entity, null);
    //     },
    //     async redo() {
    //         await invoke("soft_delete_block", { blockId: blockId });
    //         useHexHopStore.getState().deleteBlock(blockId, paletteId);
    //     },
    // });
}

export const deleteGradientBlock = async (blockId: number, gradientId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useHexHopStore.getState().deleteBlock(blockId, paletteId);

    // useColorListCommands.getState().push({
    //     async undo() {
    //         await invoke("restore_block", { blockId });
    //         const entity = await invoke<ColorEntity>("get_gradient", { gradientId });
    //         useHexHopStore.getState().pushBlock(entity, null);
    //     },
    //     async redo() {
    //         await invoke("soft_delete_block", { blockId: blockId });
    //         useHexHopStore.getState().deleteBlock(blockId, paletteId);
    //     },
    // });
}



export const deleteClipboard = async () => {
    const blockIds = await invoke("soft_delete_clipboard");
    useHexHopStore.getState().deleteClipboard();

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_blocks", { blockIds });
            const blocks = await invoke<BlockEntity[]>("load_state");
            await useHexHopStore.getState().initBlocks();
        },
        async redo() {
            await invoke("soft_delete_clipboard");
            useHexHopStore.getState().deleteClipboard();
        },
    });
}


// put to dangerous settings 
export const hardDelete = async () => {
    await invoke("hard_delete_blocks");
}


