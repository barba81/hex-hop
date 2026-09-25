import { BlockEntity } from "@/infrastructure/models/entity";
import { AppStore, ImmerStateCreator } from "./store";
import { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { rootBlockId } from "@/infrastructure/data/const-data";


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

