import type { GradientEntity } from "@/infrastructure/models/entity";
import { invoke } from "@tauri-apps/api/core";
import { useGradientStore } from "./store/use-gradient-store";

export const updateGradient = async (oldGradient: GradientEntity) => {
  await invoke("update_gradient", { gradient: oldGradient });
  const gradient = await invoke<GradientEntity>("get_gradient", {
    gradientId: oldGradient.id,
  });
    useGradientStore.getState().updateGradient(gradient);
};
