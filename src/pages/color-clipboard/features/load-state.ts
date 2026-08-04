import type { BlockEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export async function loadGradientData() {
    const blocks = await invoke<BlockEntity[]>("load_state");
    useClipboardStore.getState().initBlocks(blocks);
    blocks.map(x=>console.log(x.blockId));
}