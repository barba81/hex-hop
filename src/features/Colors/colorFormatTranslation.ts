import {
    formatHex,
    formatHex8,
    formatRgb,
    formatHsl,
    formatCss,
    modeOklab,
    useMode,
    rgb
} from "culori";
import { ColorData, ColorModel } from "@/features/common/getAllData.types";

const oklab = useMode(modeOklab);

export class ColorFormatTranslation {

    private static toNormalForm(color: ColorData) {
        return {
            mode: 'rgb' as const,
            r: color.r / 255,
            g: color.g / 255,
            b: color.b / 255,
            alpha: color.a ?? 1
        };
    }

    public static toHex(color: ColorData): string {
        const c = ColorFormatTranslation.toNormalForm(color);
        return color.a !== undefined && color.a !== null && color.a < 1 ? formatHex8(c) : formatHex(c);
    }

    public static toRgb(color: ColorModel): string {
        return formatRgb(ColorFormatTranslation.toNormalForm(color));
    }

    public static toHsl(color: ColorModel): string {
        return formatHsl(ColorFormatTranslation.toNormalForm(color));
    }

    public static toOkla(color: ColorModel): string {
        const colorObj = oklab(ColorFormatTranslation.toNormalForm(color));
        return formatCss(colorObj);
    }

    public static toVector(color: ColorModel): string {
        const { r, g, b, alpha } = ColorFormatTranslation.toNormalForm(color);
        return `vec4(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}, ${alpha.toFixed(3)})`;
    }

    public static toTailwind(color: ColorModel): string {
        const hex = formatHex(ColorFormatTranslation.toNormalForm(color));
        return `bg-[${hex}]`;
    }

    public static stringToHex(color: string): ColorData {
        const rbg = rgb(color);
        if (!rbg) {
            throw new Error("Invalid color string");
        }

        return {    
            r: Math.round(rbg.r * 255),
            g: Math.round(rbg.g * 255),
            b: Math.round(rbg.b * 255),
            a: rbg.alpha
        } as ColorData;
    }
}