import type { BlockEntity } from "@/infrastructure/models/entity";
import type { AppStore } from "./app-store";
import type { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { rootBlockId } from "@/infrastructure/data/const-data";
import type { ImmerStateCreator } from "@/infrastructure/types";

export interface GlobalSlice {
  blockIds: Record<number, number[]>;
  blocksById: Record<number, BlockEntity>;
  copyCopyFormulas: ColorCopyFormula[];
}

export const createHexHopSlice: ImmerStateCreator<AppStore, GlobalSlice> = () => ({
  blockIds: { [rootBlockId]: [] },
  blocksById: {},
  copyCopyFormulas: [],
});

