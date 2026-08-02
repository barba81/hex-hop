import type { GradientEntity } from "@/infrastructure/entity";
import { invoke } from "@tauri-apps/api/core";

export async function loadGradientData() {
    console.time("state");
    const color = await invoke<GradientEntity[]>("load_state");
    console.log(color);
    console.timeEnd("state");
    // const gradients = await invoke<GradientEntity[]>("get_all_gradient");
    // useGradientStore.getState().initGradient(gradients);
}