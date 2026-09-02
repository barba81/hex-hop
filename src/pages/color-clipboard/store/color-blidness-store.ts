import { ColorBlindnessType } from "@/infrastructure/models/color-blidness-types";
import { create } from "zustand";

interface ColorBlindnessStore {
  colorBlindnessMode: ColorBlindnessType;
}

interface ColorBlindnessAction {
  updateColorBlindness: (ColorBlindnessType: ColorBlindnessType) => void;
}

export const useColorBlindnessStore = create<ColorBlindnessStore & ColorBlindnessAction>()((set) => ({
  colorBlindnessMode: 'regular',
  updateColorBlindness: (updateBlock: ColorBlindnessType) =>
    set(() => ({
      colorBlindnessMode: updateBlock,
    })),
}));