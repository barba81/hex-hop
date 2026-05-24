import { ColorModel } from "./color.model";
import { GradientModel } from "./gradient.model";


export type Palette =  {
    id: number;
    order: number;
    name: string;
    children: (ColorModel | GradientModel)[];
}



