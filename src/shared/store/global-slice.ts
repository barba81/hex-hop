import type { AppStore, ImmerStateCreator } from "./app-store";
import type { ColorCopyFormula } from "@/features/color-copy-list/color-copy-list";

export interface GlobalSlice {
  copyCopyFormulas: ColorCopyFormula[];
}

export const createHexHopSlice: ImmerStateCreator<AppStore, GlobalSlice> = () => ({
  copyCopyFormulas: [],
});

