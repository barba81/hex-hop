import { ColorRequest, ColorEntity } from "@/shared/types/entity";
import { invoke } from "@tauri-apps/api/core";

export interface IColorRepository {
    addColor: (colorData: ColorRequest) => Promise<ColorEntity>;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorRepository implements IColorRepository {
    public async addColor(colorData: ColorRequest) {
        return await invoke<ColorEntity>("create_color", {
            color: colorData,
        });
    }
    public updateColor() {

    }

    public deleteColor() {

    }
}