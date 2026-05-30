import { ColorEntity } from "./color.entity";
import { GradientEntity } from "./gradient.entity";


export type PaletteEntity =  {
    kind: "palette",
    id: number;
    blockId:number;
    order: number;
    name: string;
    children: (ColorEntity | GradientEntity)[];
}



