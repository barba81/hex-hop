import type { BlockEntity } from "@/shared/models/entity";
import type { AppStore } from "./app-store";
import type { ColorCopyFormula } from "@/shared/models/color-copy-list";
import { rootBlockId } from "@/shared/data/const-data";
import type { ImmerStateCreator } from "@/shared/types";

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

