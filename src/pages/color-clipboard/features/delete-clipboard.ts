import { invoke } from "@tauri-apps/api/core";

export const deleteBlock = async (blockId: number) => {
    await invoke("soft_delete_block", {blockId:blockId});
} 

export const deletePaletteBlocks = async (paletteId: number) => {
    // const blocks = await invoke<BlockEntity[]>("load_state");
    // useClipboardStore.getState().initBlocks(blocks);
}

export const deleteClipboard = async () => {
    // const blocks = await invoke<BlockEntity[]>("load_state");
    // useClipboardStore.getState().initBlocks(blocks);
}

export const hardDelete = async () => {
    // const blocks = await invoke<BlockEntity[]>("load_state");
    // useClipboardStore.getState().initBlocks(blocks);
}


