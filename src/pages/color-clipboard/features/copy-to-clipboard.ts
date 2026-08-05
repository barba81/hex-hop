import type { ColorEntity } from '@/infrastructure/entity';
import type { ColorSpaceType } from '@/infrastructure/enum';

export const copyToClipboard = async (_: ColorEntity, _colorFormat: ColorSpaceType) => {
    // const formatMap: Record<ColorSpace, (c: ColorEntity) => string> = {
    //     "oklab": ColorFormatTranslation.toHex,

    // };
   
    // await writeText( formatRgb(toNormalForm(color)));
}
