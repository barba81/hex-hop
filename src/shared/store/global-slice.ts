import type { BlockEntity } from "@/features/palette-generator-page/types/entity";
import type { AppStore, ImmerStateCreator } from "./app-store";
import type { ColorCopyFormula } from "@/features/color-copy-list/color-copy-list";
import { rootBlockId } from "@/shared/data/const-data";

export interface GlobalSlice {
  blockIds: Record<string, number[]>;
  blocksById: Record<string, BlockEntity>;
  copyCopyFormulas: ColorCopyFormula[];
}

export const createHexHopSlice: ImmerStateCreator<AppStore, GlobalSlice> = () => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  copyCopyFormulas: [],
});

