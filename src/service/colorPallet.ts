import { ColorEntity } from "@/model/color";
import { ColorFormat } from "@/model/colorFormat";
import { ColorRepository } from "@/repo/colorRepository";
import { useColorStore } from "@/store/useColorStore";
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { ColorFormatTranslation } from "./colorFormatTranslation";

export class ColorPallet {
    static async LoadAllColor() {
        const colors = await ColorRepository.getAllColors();
        useColorStore.getState().addAllColor(colors);
    }

    static async DeleteById(color: ColorEntity) {
        await ColorRepository.deleteById(color);
        useColorStore.getState().deleteById(color.id);
    }

    static async ClearAll() {
        await ColorRepository.deleteAll();
        useColorStore.getState().deleteAll();
    }

    static async CopyToClipboard(color: ColorEntity, colorFormat: ColorFormat) {
        const formatMap: Record<ColorFormat, (c: ColorEntity) => string> = {
            "#": ColorFormatTranslation.toHex,
            "RBG": ColorFormatTranslation.toRgb,
            "HSL": ColorFormatTranslation.toHsl,
            "OK": ColorFormatTranslation.toOkla,
            "VEC": ColorFormatTranslation.toVector,
            "Tailwind": ColorFormatTranslation.toTailwind, 
        };

        await writeText(formatMap[colorFormat](color));
    }


}