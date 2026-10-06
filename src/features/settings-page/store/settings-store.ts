import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface HexHopStore {
    colorCopyFormulaActiveId: string | null,
}

export const useSettingStore = create<HexHopStore>()(immer((set) => ({
    colorCopyFormulaActiveId: null,
})));