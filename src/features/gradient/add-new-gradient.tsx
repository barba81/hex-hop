import { invoke } from "@tauri-apps/api/core";
import { type GradientEntity } from "../infrastructure/entity/gradient.entity";

const newGradient = Object.freeze({
  name: "New gradient",
  kind: "gradient",
  id: 0,
  blockId: 0,
  order: 0,
  paletteId: null,
  layers: [
    {
      gradientType: "linear",
      colorSpace: "srgb",
      easingFunction: "linear",
      rotationDegree: 0,
      id: 0,
      order: 0,
      patternRepeatNumber: 0,
      stops: [
        {
          id: 0,
          layerId: 0,
          order: 0,
          a: 1.0,
          b: 1.0,
          g: 1.0,
          r: 1.0,
          position: 0,
        },
        {
          id: 0,
          layerId: 0,
          order: 0,
          a: 1.0,
          b: 1.0,
          g: 1.0,
          r: 1.0,
          position: 1,
        },
      ],
    },
  ],
});

export const addNewGradient = async () => {
  let gradientId = await invoke("save_gradient", { gradient: newGradient });
  console.log(gradientId);
  let gradient = await invoke<GradientEntity>("get_gradient", { id: gradientId });
  console.log(gradient);
};
