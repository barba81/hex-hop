import { IColorRepository } from "@/features/color-block/service/ColorRepository";
import { ColorEntity } from "@/features/color-block/types/entity";
import { colorStringToColor, validateColor } from "@/features/color-block/utils/color-format-changer";
import { getSmartColorName } from "@/features/color-block/utils/create-color-name";
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

    public async addColor(stringColor: string, paletteId: number | null) {
        if (!validateColor(stringColor)) return null;
        
        const colorData = colorStringToColor(stringColor);
        const name = await getSmartColorName(colorData);
        const entity = await this.repository.addColor({...colorData, name, id: nanoid() } as ColorEntity);
        
        return entity;
    }

    updateColor() {

    }

    deleteColor() {

    }
}