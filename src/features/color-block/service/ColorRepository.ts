import { invoke } from "@tauri-apps/api/core";

export interface IColorRepository {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorRepository implements IColorRepository {
    public addColor() {
        const colorEntity = await invoke<ColorEntity>("create_color", {
            color: { ...colorData, id: nanoid(), },
        });
    }
    public updateColor() {

    }

    public deleteColor() {

    }
}