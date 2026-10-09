import type { AppStore, ImmerStateCreator } from "../../../shared/store/app-store";
import type { ColorCopyFormula } from "@/features/block-list/color-copy-list/color-copy-list";

export interface SettingsSlice {
  copyCopyFormulas: ColorCopyFormula[];
  colorCopyFormulaActiveId: string | null,
}

export const createSettingsSlice: ImmerStateCreator<AppStore, SettingsSlice> = () => ({
  colorCopyFormulaActiveId: null,
  copyCopyFormulas: [],
});

