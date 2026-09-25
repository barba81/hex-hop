import { BlockEntity } from "@/infrastructure/models/entity";
import { AppStore } from "./store";
import { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { rootBlockId } from "@/infrastructure/data/const-data";
import { ImmerStateCreator } from "@/infrastructure/types";


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

