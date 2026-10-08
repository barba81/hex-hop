import { IColorRepository } from "@/features/color-block/service/ColorRepository";
import { ColorRequest, ColorEntity } from "@/features/color-block/types/entity";
import { colorStringToColor, toHex8, validateColor } from "@/features/color-block/utils/color-format-changer";
import { getSmartColorName, toRgb } from "@/features/color-block/utils/create-color-name";
import { converter } from "culori";
import { nanoid } from "nanoid";


export interface IColorService {
    addColor: (color: string, paletteId: number | null) => void;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorService implements IColorService {
    private repository: IColorRepository;

    constructor(_repository: IColorRepository) {
        this.repository = _repository;
    }

    public async addColor(stringColor: string, parentPaletteId: number | null) {
        if (!validateColor(stringColor)) return null;

        const color = colorStringToColor(stringColor);
        const name = await getSmartColorName(color);
        const { mode, ...rgb } = toRgb(color);
        const entity = await this.repository.addColor({
            ...rgb,
            id: nanoid(),
            name,
            parentPaletteId,
        } as ColorRequest);
        return entity;
    }

    updateColor() {

    }

    deleteColor() {

    }
}