import {
    formatHex,
    formatHex8,
    formatRgb,
    formatHsl,
    formatCss,
    modeOklab,
    useMode
} from "culori";
import { ColorEntity } from "@/model/color";

const oklab = useMode(modeOklab);

export class ColorFormatTranslation {

    private static toCulori(color: ColorEntity) {
        return {
            mode: 'rgb' as const,
            r: color.r / 255,
            g: color.g / 255,
            b: color.b / 255,
            alpha: color.a ?? 1
        };
    }

    public static toHex(color: ColorEntity): string {
        const c = ColorFormatTranslation.toCulori(color);
        return color.a !== undefined && color.a !== null && color.a < 1 ? formatHex8(c) : formatHex(c);
    }

    public static toRgb(color: ColorEntity): string {
        return formatRgb(ColorFormatTranslation.toCulori(color));
    }

    public static toHsl(color: ColorEntity): string {
        return formatHsl(ColorFormatTranslation.toCulori(color));
    }

    public static toOkla(color: ColorEntity): string {
        const colorObj = oklab(ColorFormatTranslation.toCulori(color));
        return formatCss(colorObj);
    }

    public static toVector(color: ColorEntity): string {
        const { r, g, b, alpha } = ColorFormatTranslation.toCulori(color);
        return `vec4(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}, ${alpha.toFixed(3)})`;
    }

    public static toTailwind(color: ColorEntity): string {
        const hex = formatHex(ColorFormatTranslation.toCulori(color));
        return `bg-[${hex}]`;
    }
}