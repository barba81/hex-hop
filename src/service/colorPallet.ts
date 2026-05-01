import { ColorEntity, ColorFormat } from "@/model/color";
import { ColorRepository } from "@/repo/colorRepository";
import { useColorStore } from "@/store/useColorStore";
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { ColorFormatTranslation } from "./colorFormatTranslation";
import { ColorValidator } from "./colorFormatValidator";

export class ColorPallet {

    static async AddColor(color: string) {
        const colorData = ColorFormatTranslation.stringToHex(color);
        const colorEntity = await ColorRepository.addColor(colorData);
        if (colorEntity !== undefined) {
            useColorStore.getState().addColor(colorEntity);
        }
    }

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

   static  async ValidateColor(color: string) {
        const state = useColorStore.getState();
        const result = ColorValidator.validateAndConvert(color);

        state.setIsColorValid(result.isValid)
        if (result.isValid) {
            state.setFormat(result.format as ColorFormat);
        }
    }
}