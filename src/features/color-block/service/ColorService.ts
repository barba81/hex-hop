import { IColorRepository } from "@/features/color-block/service/ColorRepository";
import { colorStringToData } from "@/features/color-block/utils/color-format-changer";
import { getSmartColorName } from "@/features/color-block/utils/create-color-name";
import { invoke } from "@tauri-apps/api/core";


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

    public async addColor(color: string, paletteId: number | null) {
        const colorData = colorStringToData(color);
        const name = await getSmartColorName(colorData);

        const entity = await this.repository.addColor({...colorData, name, id: });
        return entity;
    }

    updateColor() {

    }

    deleteColor() {

    }
}