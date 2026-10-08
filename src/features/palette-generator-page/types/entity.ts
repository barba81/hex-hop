import { ColorEntity } from "@/shared/types/entity";
import { GradientEntity } from "@/features/gradient-generator/types/type";


export type BlockEntity = (PaletteEntity | ColorEntity | GradientEntity);


export type PaletteEntitySummary = {
    kind: "palette",
    id: number;
    blockId:number;
    blockOrder: number;
    name: string;
}

export type PaletteEntity =  {
    blocks: (ColorEntity | GradientEntity)[] | null;
} & PaletteEntitySummary;

export const  toPaletteSummary = (entity: PaletteEntity): PaletteEntitySummary => {
  const { blocks, ...summary } = entity;
  return summary;
}

