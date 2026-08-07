import type { ColorEntity } from '@/infrastructure/models/entity';
import type { ColorSpaceType } from '@/infrastructure/models/enum';

export const copyToClipboard = async (_: ColorEntity, _colorFormat: ColorSpaceType) => {
    // const formatMap: Record<ColorSpace, (c: ColorEntity) => string> = {
    //     "oklab": ColorFormatTranslation.toHex,

    // };
   
    // await writeText( formatRgb(toNormalForm(color)));
}
