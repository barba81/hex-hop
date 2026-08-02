import { writeText } from '@tauri-apps/plugin-clipboard-manager';

import {
    formatRgb,
} from "culori";
import { toNormalForm } from './color-format-changer';
import type { ColorEntity } from '@/infrastructure/entity';
import type { ColorSpaceType } from '@/infrastructure/enum';



export const copyToClipboard = async (color: ColorEntity, _colorFormat: ColorSpaceType) => {
    // const formatMap: Record<ColorSpace, (c: ColorEntity) => string> = {
    //     "oklab": ColorFormatTranslation.toHex,

    // };
   
    await writeText( formatRgb(toNormalForm(color)));
}
