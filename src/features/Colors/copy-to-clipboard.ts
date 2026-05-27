import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { ColorEntity } from '../infrastructure/entity/color.entity';
import { ColorSpace } from '../infrastructure/enum/color-space.enum';
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
import { toNormalForm } from './color-format-changer';


export const copyToClipboard = async (color: ColorEntity, colorFormat: ColorSpace) => {
    // const formatMap: Record<ColorSpace, (c: ColorEntity) => string> = {
    //     "oklab": ColorFormatTranslation.toHex,

    // };
   
    await writeText( formatRgb(toNormalForm(color)));
}
