import type { GradientEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export async function loadGradientData() {
    console.time("state");
    const blocks = await invoke<GradientEntity[]>("load_state");
    console.timeEnd("state");
    useClipboardStore.getState().initBlocks(blocks);
    const gradients = await invoke<GradientEntity[]>("get_all_gradient");
}