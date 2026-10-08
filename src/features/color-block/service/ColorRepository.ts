import { ColorData } from "@/features/color-block/types/types";
import { invoke } from "@tauri-apps/api/core";

export interface IColorRepository {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorRepository implements IColorRepository {
    public addColor(colorData: ColorData) {
           const colorEntity = await invoke<ColorEntity>("create_color", {
            color: { ...colorData, id: nanoid(), name },
        });
    }
    public updateColor() {

    }

    public deleteColor() {

    }
}