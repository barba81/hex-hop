import { useGradientStore } from "@/pages/gradient-generator/store/use-gradient-store";
import { invoke } from "@tauri-apps/api/core";

export const deleteGradient = async (gradientId: number) => {
  await invoke("delete_gradient", { gradientId: gradientId });
  useGradientStore.getState().deleteGradient(gradientId);
};

export const deleteGradientLayer = async (gradientId: number, layerId: number) => {
  await invoke("delete_layer", { layerId: layerId });
  useGradientStore.getState().deleteGradientLayer(gradientId, layerId);
};

export const deleteGradientStop = async (gradientId: number, layerId: number, stopId: number) => {
  await invoke("delete_stop", { stopId: stopId });
  useGradientStore.getState().deleteGradientStop(gradientId, layerId, stopId);
};
