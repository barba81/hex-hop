import { useGradientStore } from "@/store/use-gradient-store";
import { invoke } from "@tauri-apps/api/core";

export const deleteGradient = async (gradientId: number) => {
  console.time();
  await invoke("delete_gradient", { gradientId: gradientId });
  useGradientStore.getState().deleteGradient(gradientId);
  console.timeEnd();
};

export const deleteGradientLayer = async (layerId: number) => {
  console.time();
  await invoke("delete_layer", { layerId: layerId });
  console.timeEnd();
};

export const deleteGradientStop = async (stopId: number) => {
  console.time();
  await invoke("delete_stop", { stopId: stopId });
  console.timeEnd();
};
