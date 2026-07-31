import { useGradientStore } from "@/store/use-gradient-store";
import { invoke } from "@tauri-apps/api/core";

export const deleteGradient = async (gradientId: number) => {
  console.time();
  await invoke("delete_gradient", { gradientId: gradientId });
  useGradientStore.getState().deleteGradient(gradientId);
  console.timeEnd();
};

export const deleteGradientLayer = async (gradientId: number, layerId: number) => {
  console.time();
  await invoke("delete_layer", { layerId: layerId });
  useGradientStore.getState().deleteGradientLayer(gradientId, layerId);

  console.timeEnd();
};

export const deleteGradientStop = async (gradientId: number, layerId: number, stopId: number) => {
  console.time();
  await invoke("delete_stop", { stopId: stopId });
  useGradientStore.getState().deleteGradientStop(gradientId, layerId, stopId);
  console.timeEnd();
};
