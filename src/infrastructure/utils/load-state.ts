import type { BlockEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const loadState = async () => {
    const blocks = await invoke<BlockEntity[]>("load_state");
    useClipboardStore.getState().initBlocks(blocks);
}