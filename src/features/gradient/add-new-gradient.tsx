import { invoke } from "@tauri-apps/api/core";
import {
  GradientEntity,
  GradientLayerEntity,
  GradientStopEntity,
} from "../infrastructure/entity/gradient.entity";
import { useGradientStore } from "@/store/use-gradient-store";

export const newGradient = Object.freeze({
  name: "New gradient",
  layers: [
  ],
});

export const addNewGradient = async () => {
  console.time();
  let gradientId = await invoke("save_gradient", { gradient: newGradient });
  console.timeEnd();
  let gradient = await invoke<GradientEntity>("get_gradient", {
    gradientId: gradientId,
  });
  useGradientStore.getState().addGradient(gradient);
};

export const addNewLayer = async (gradientId: number) => {
  let layerId = await invoke("save_layer", {
    layer: newGradient.layers[0],
    gradientId: gradientId,
  });
  let layer = await invoke<GradientLayerEntity>("get_layer", {
    layerId: layerId,
  });
  useGradientStore.getState().addLayerToSelected(gradientId, layer);
};

export const addNewStop = async (gradientId: number, layerId: number) => {
  let stopId = await invoke("save_stop", {
    stop: newGradient.layers[0].stops[0],
    layerId: layerId,
  });
  let stop = await invoke<GradientStopEntity>("get_stop", { stopId: stopId });
  useGradientStore.getState().addGradientStop(gradientId, layerId, stop);
};
