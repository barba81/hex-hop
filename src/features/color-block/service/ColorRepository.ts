import { ColorEntity } from "@/features/color-block/types/entity";
import { invoke } from "@tauri-apps/api/core";

export interface IColorRepository {
    addColor: (colorData: ColorEntity) => Promise<ColorEntity>;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorRepository implements IColorRepository {
    public async addColor(colorData: ColorEntity) {
        const colorEntity = await invoke<ColorEntity>("create_color", {
            color: colorData,
        });
        return colorEntity;
    }
    public updateColor() {

    }

    public deleteColor() {

    }
}