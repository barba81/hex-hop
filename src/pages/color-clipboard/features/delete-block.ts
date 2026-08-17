import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";
import { ColorEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const deleteColorBlock = async (blockId: number, colorId: number, paletteId: number | null) => {
    await invoke("soft_delete_block", { blockId: blockId });
    useClipboardStore.getState().deleteBlock(blockId, paletteId);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId: colorId });
            useClipboardStore.getState().addBlock(entity);
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
            useClipboardStore.getState().addBlock(entity);
        },
        async redo() {
            await invoke("soft_delete_block", { blockId: blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
    });
}


// const deletePaletteBlocks = async (_: number) => {
// const blocks = await invoke<BlockEntity[]>("load_state");
// useClipboardStore.getState().initBlocks(blocks);
// }

export const deleteClipboard = async () => {
    const blockIds = await invoke("soft_delete_clipboard");
    useClipboardStore.getState().deleteClipboard();

    useColorListCommands.getState().push({
        async undo() {
            await invoke("restore_blocks", { blockIds });
            // const entity = await invoke<ColorEntity>("get_gradient", { gradientId });
            // useClipboardStore.getState().addBlock(entity);
        },
        async redo() {
            // await invoke("soft_delete_block", { blockId: blockId });
            // useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
    });
}

export const hardDelete = async () => {
    await invoke("hard_delete_blocks");
}


