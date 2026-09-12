import { CSSIcon } from "@/components/icons/css-icon";
import { HexIcon } from "@/components/icons/hex-icon";
import type { ComponentType } from "react";
// import CSSIcon from "@/assets/icons/Official_CSS_Logo.svg?react";

export interface ColorCopyList {
    id: number;
    fallBack: string;
    icon?: ComponentType;
    isIcon: boolean,
}

export const defaultColorCopyList: ColorCopyList[] = [
    { id: -1, fallBack: "CSS", icon: CSSIcon, isIcon: true },
    { id: -2, fallBack: "HEX", icon: CSSIcon, isIcon: true },
    { id: -2, fallBack: "HEX", icon: CSSIcon, isIcon: true },
    { id: -2, fallBack: "HEX", icon: CSSIcon, isIcon: true },
    { id: -2, fallBack: "HEX", icon: CSSIcon, isIcon: true },
    { id: -3, fallBack: "OKLAB", isIcon: false },
    { id: -4, fallBack: "VEC4", isIcon: false },
];