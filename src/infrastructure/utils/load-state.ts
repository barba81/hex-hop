import type { BlockEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const loadState = async () => {
    const blocks = await invoke<BlockEntity[]>("load_state");

    useClipboardStore.getState().initBlocks(blocks);
}