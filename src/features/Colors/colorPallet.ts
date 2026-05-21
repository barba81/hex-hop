import { ColorModel, ColorFormat } from "@/features/GetAllData/GetAllData.types";
import { ColorRepository } from "@/features/Colors/colorRepository";
import { useColorStore } from "@/store/useColorStore";
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { ColorFormatTranslation } from "./colorFormatTranslation";
import { ColorLookupName } from "./colorLookup";
import { ColorValidator } from "./colorFormatValidator";


export class ColorPallet {

    static async AddColor(color: string) {

        const colorData = ColorFormatTranslation.stringToHex(color);
        colorData.name = await ColorLookupName.nearestColor(color);;
        const data = await ColorRepository.addColor(colorData);
        if (data !== undefined) {
            useColorStore.getState().addColor(data);
        }
    }

    static async LoadAllColor() {
        const colors = await ColorRepository.getAllColors();
        useColorStore.getState().addAllColor(colors);
    }

    static async DeleteById(color: ColorModel) {
        await ColorRepository.deleteById(color);
        useColorStore.getState().deleteById(color.id);
    }

    static async ClearAll() {
        await ColorRepository.deleteAll();
        useColorStore.getState().deleteAll();
    }

    static async CopyToClipboard(color: ColorModel, colorFormat: ColorFormat) {
        const formatMap: Record<ColorFormat, (c: ColorModel) => string> = {
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
            state.setLastValidColor(ColorFormatTranslation.toHex(result.entity));
            state.setFormat(result.format as ColorFormat);
        }
    }
}