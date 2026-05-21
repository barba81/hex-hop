import { Color } from "./Color.model";
import { Gradient } from "./Gradient.model";

export type Palette =  {
    id: number;
    order: number;
    name: string;
    children: (Color | Gradient)[];
}



