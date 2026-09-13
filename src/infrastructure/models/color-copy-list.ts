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
}

export const defaultColorCopyList: ColorCopyList[] = [
    { id: -1, fallBackName: "CSS", icon: CSSIcon, isIcon: true, order: 0, formula: "" },
    { id: -2, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -3, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -4, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -5, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -6, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -7, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -8, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
    { id: -9, fallBackName: "HEX", icon: BlenderIcon, isIcon: true, order: 0, formula: "" },
];