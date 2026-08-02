import { invoke } from "@tauri-apps/api/core";

import { useGradientStore } from "@/store/use-gradient-store";
import { newGradient } from "./default-const-gradient";
import type { GradientEntity, GradientLayerEntity, GradientStopEntity } from "@/infrastructure/entity";

export const addNewGradient = async () => {
  const gradientId = await invoke("create_gradient", { gradient: newGradient });
  const gradient = await invoke<GradientEntity>("get_gradient", {
    gradientId: gradientId,
  });
  useGradientStore.getState().addGradient(gradient);
};

export const addNewLayer = async (gradientId: number) => {
  const layerId = await invoke("create_layer", {
    layer: newGradient.layers[0],
    gradientId: gradientId,
  });
  const layer = await invoke<GradientLayerEntity>("get_layer", {
    layerId: layerId,
  });
  useGradientStore.getState().addLayerToSelected(gradientId, layer);
};

export const addNewStop = async (gradientId: number, layerId: number) => {
  const stopId = await invoke("create_stop", {
    stop: newGradient.layers[0].stops[0],
    layerId: layerId,
  });
  const stop = await invoke<GradientStopEntity>("get_stop", { stopId: stopId });
  useGradientStore.getState().addGradientStop(gradientId, layerId, stop);
};
