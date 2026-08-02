import { GradientEntity } from "@/infrastructure/entity";
import { useGradientStore } from "@/store/use-gradient-store";
import { invoke } from "@tauri-apps/api/core";

/**
 * Loads gradient data and initializes the gradient store.
 */
export async function loadGradientData() {
    const color = await invoke<GradientEntity[]>("get_all_colors");
    const gradients = await invoke<GradientEntity[]>("get_all_gradient");
    useGradientStore.getState().initGradient(gradients);
}