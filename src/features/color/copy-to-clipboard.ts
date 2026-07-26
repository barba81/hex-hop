import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { ColorEntity } from '../infrastructure/color.entity';
import { ColorSpaceType } from '../infrastructure/enum/color-space.enum';
import {
    formatRgb,
} from "culori";
import { toNormalForm } from './color-format-changer';


export const copyToClipboard = async (color: ColorEntity, _colorFormat: ColorSpaceType) => {
    // const formatMap: Record<ColorSpace, (c: ColorEntity) => string> = {
    //     "oklab": ColorFormatTranslation.toHex,

    // };
   
    await writeText( formatRgb(toNormalForm(color)));
}
