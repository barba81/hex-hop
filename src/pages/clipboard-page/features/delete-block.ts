import { useColorListCommands } from "@/store/command-manager-provider";
import type { BlockEntity, ColorEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/store/clipboard-store";
import { invoke } from "@tauri-apps/api/core";






export const deleteColorBlock = async (blockId: number, colorId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useClipboardStore.getState().deleteBlock(blockId, paletteId);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId: colorId });
            useClipboardStore.getState().pushBlock(entity, null);
        },
        async redo() {
            await invoke("soft_delete_block", { blockId: blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
    });
}

export const deleteGradientBlock = async (blockId: number, gradientId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useClipboardStore.getState().deleteBlock(blockId, paletteId);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_gradient", { gradientId });
            useClipboardStore.getState().pushBlock(entity, null);
        },
        async redo() {
            await invoke("soft_delete_block", { blockId: blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
    });
}



export const deleteClipboard = async () => {
    const blockIds = await invoke("soft_delete_clipboard");
    useClipboardStore.getState().deleteClipboard();

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_blocks", { blockIds });
            const blocks = await invoke<BlockEntity[]>("load_state");
            await useClipboardStore.getState().initBlocks();
        },
        async redo() {
            await invoke("soft_delete_clipboard");
            useClipboardStore.getState().deleteClipboard();
        },
    });
}


// put to dangerous settings 
export const hardDelete = async () => {
    await invoke("hard_delete_blocks");
}


