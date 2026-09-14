import { TailwindIcon } from "@/components/icons/css-icon";
import { BlenderIcon } from "@/components/icons/css-icon";
import { CSSIcon } from "@/components/icons/css-icon";
import { Color } from "culori";
import type { ComponentType } from "react";
// import CSSIcon from "@/assets/icons/Official_CSS_Logo.svg?react";

export interface ColorCopyFormula {
    id: number;
    formulaName: string;
    icon?: ComponentType;
    formulaOrder: number,
    formula: string,
    enabled: boolean
}
export const defaultColorCopyFormula = {  enabled: true, fallBackName: "Tailwind2", icon: TailwindIcon, isIcon: true, order: 2, formula: "#RRGGBB" };

export const defaultColorCopyList: ColorCopyFormula[] = [
    { id: -1, enabled: true, formulaName: "CSS", icon: CSSIcon,  formulaOrder: 0, formula: "rgb(r, g, b)" },
    { id: 2, enabled: true, formulaName: "HEX", icon: BlenderIcon, formulaOrder: 1, formula: "#RRGGBB" },
    { id: 3, enabled: true, formulaName: "Tailwind", icon: TailwindIcon, formulaOrder: 2, formula: "#RRGGBB" },
];


type Channel = {
  channelName: string;
  formulaName: string;
  get: (color: any) => number;
};

type ColorFormat = {
  formatName: string;
  convert: (color: Color) => any;
  channels: Channel[];
};


export const defaultFormulas = [
  {
    "formatName": "srgb",
    "channels": [
      {
        "channelName": "Red",
        "formulaName": "[srgb.r]",
        "formula": "color.r"
      },
      {
        "channelName": "Green",
        "formulaName": "[srgb.g]",
        "formula": "color.g"
      },
      {
        "channelName": "Blue",
        "formulaName": "[srgb.b]",
        "formula": "color.b"
      }
    ],
    "create": "culori.converter('srgb')"
  },
  {
    "formatName": "oklab",
    "channels": [
      {
        "channelName": "Lightness",
        "formulaName": "[oklab.l]",
        "formula": "color.l"
      },
      {
        "channelName": "A",
        "formulaName": "[oklab.a]",
        "formula": "color.a"
      },
      {
        "channelName": "B",
        "formulaName": "[oklab.b]",
        "formula": "color.b"
      }
    ],
    "create": "culori.converter('oklab')"
  }
]