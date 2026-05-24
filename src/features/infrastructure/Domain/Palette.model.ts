import { ColorModel } from "./Color.model";
import { GradientModel } from "./Gradient.model";


export type Palette =  {
    id: number;
    order: number;
    name: string;
    children: (ColorModel | GradientModel)[];
}



