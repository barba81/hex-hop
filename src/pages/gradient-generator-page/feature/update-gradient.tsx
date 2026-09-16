import type { GradientEntity } from "@/infrastructure/models/entity";
import { useGradientStore } from "@/pages/gradient-generator/store/use-gradient-store";
import { invoke } from "@tauri-apps/api/core";

export const updateGradient = async (oldGradient: GradientEntity) => {
  await invoke("update_gradient", { gradient: oldGradient });
  const gradient = await invoke<GradientEntity>("get_gradient", {
    gradientId: oldGradient.id,
  });
    useGradientStore.getState().updateGradient(gradient);
};
