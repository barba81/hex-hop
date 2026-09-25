import type { BlockEntity } from "@/infrastructure/models/entity";
import { useAppStore } from "@/store/store";
import { invoke } from "@tauri-apps/api/core";

export const deleteColorBlock = async (blockId: number, colorId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useAppStore.getState().deleteBlock(blockId, paletteId);

    // useColorListCommands.getState().push({
    //     async undo() {
    //         await invoke("restore_block", { blockId });
    //         const entity = await invoke<ColorEntity>("get_color", { colorId: colorId });
    //         useAppStore.getState().pushBlock(entity, null);
    //     },
    //     async redo() {
    //         await invoke("soft_delete_block", { blockId: blockId });
    //         useAppStore.getState().deleteBlock(blockId, paletteId);
    //     },
    // });
}

export const deleteGradientBlock = async (blockId: number, gradientId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useAppStore.getState().deleteBlock(blockId, paletteId);

    // useColorListCommands.getState().push({
    //     async undo() {
    //         await invoke("restore_block", { blockId });
    //         const entity = await invoke<ColorEntity>("get_gradient", { gradientId });
    //         useAppStore.getState().pushBlock(entity, null);
    //     },
    //     async redo() {
    //         await invoke("soft_delete_block", { blockId: blockId });
    //         useAppStore.getState().deleteBlock(blockId, paletteId);
    //     },
    // });
}



export const deleteClipboard = async () => {
    const blockIds = await invoke("soft_delete_clipboard");
    useAppStore.getState().deleteClipboard();

    useAppStore.getState().push({
        async undo() {
            await invoke("restore_blocks", { blockIds });
            const blocks = await invoke<BlockEntity[]>("load_state");
            await useAppStore.getState().initBlocks();
        },
        async redo() {
            await invoke("soft_delete_clipboard");
            useAppStore.getState().deleteClipboard();
        },
    });
}


// put to dangerous settings 
export const hardDelete = async () => {
    await invoke("hard_delete_blocks");
}


