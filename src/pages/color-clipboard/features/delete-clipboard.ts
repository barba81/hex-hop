import { useClipboardStore } from "@/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const deleteBlock = async (blockId: number, paletteId?: number) => {
    await invoke("soft_delete_block", {blockId:blockId});
    useClipboardStore.getState().deleteBlock(blockId, paletteId);
} 

// const deletePaletteBlocks = async (_: number) => {
    // const blocks = await invoke<BlockEntity[]>("load_state");
    // useClipboardStore.getState().initBlocks(blocks);
// }

export const deleteClipboard = async () => {
    await invoke("soft_delete_clipboard");
    useClipboardStore.getState().deleteClipboard();
}

export const hardDelete = async () => {
    await invoke("hard_delete_blocks");
}


