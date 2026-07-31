import { useGradientStore } from "@/store/use-gradient-store";
import { GradientEntity } from "../../infrastructure/entity";
import { invoke } from "@tauri-apps/api/core";

export const updateGradient = async (oldGradient: GradientEntity) => {
  await invoke("update_gradient", { gradient: oldGradient });
  let gradient = await invoke<GradientEntity>("get_gradient", {
    gradientId: oldGradient.id,
  });
    useGradientStore.getState().updateGradient(gradient);
};
