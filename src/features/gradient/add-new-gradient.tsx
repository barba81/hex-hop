import { invoke } from "@tauri-apps/api/core";
import { type GradientEntity } from "../infrastructure/entity/gradient.entity";

const newGradient = Object.freeze({
  name: "New gradient",
  layers: [
    {
      gradientType: "linear",
      colorSpace: "srgb",
      easingFunction: "linear",
      rotationDegree: 0,
      gradientOrder: 1,
      patternRepeatNumber: 0,
      stops: [
        {
          gradientOrder: 1,
          a: 1.0,
          b: 1.0,
          g: 1.0,
          r: 1.0,
          position: 0,
        },
        {
          gradientOrder: 2,
          a: 1.0,
          b: 1.0,
          g: 1.0,
          r: 1.0,
          position: 0.5,
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
