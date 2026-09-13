import { BlenderIcon } from "@/components/icons/css-icon";
import { CSSIcon } from "@/components/icons/css-icon";
import type { ComponentType } from "react";
// import CSSIcon from "@/assets/icons/Official_CSS_Logo.svg?react";

export interface ColorCopyList {
    id: number;
    fallBackName: string;
    icon?: ComponentType;
    isIcon: boolean,
    order: number, 
    formula: string,
    enabled: boolean
}

export const defaultColorCopyList: ColorCopyList[] = [
    { id: -1, enabled: true, fallBackName: "CSS", icon: CSSIcon, isIcon: true, order: 0, formula: "rgb(r, g, b)" },
    { id: -2, enabled: true, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 1, formula: "#RRGGBB" },

];