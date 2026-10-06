import { IColorRepository } from "@/features/clipboard-page/service/ColorRepository";
import { invoke } from "@tauri-apps/api/core";

import {
    nearest,
    differenceCiede2000,
    Color
} from 'culori/fn';


export interface IColorService {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
    getSmartColorName: (color: Color) => Promise<string>;
}
let nearestNameGetter: ((color: Color | string, n?: number, τ?: number) => string[]) | null = null;

export class ColorService implements IColorService {
    private repository: IColorRepository;

    constructor(_repository: IColorRepository) {
        this.repository = _repository;
    }

    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;


    private setUpNearestName = async () => {
        const colors = await invoke<string>("get_color_name_data");
        const palette: Record<string, string> = {};
        colors
            .trim()
            .split('\n')
            .slice(1)
            .forEach(row => {
                if (!row.trim()) return;

                const [name, hex] = row.split(',').map(item => item.trim());
                if (name && hex) {
                    palette[name] = hex;
                }
            });
        const names = Object.keys(palette);
        const diffCiede2000 = differenceCiede2000();
        nearestNameGetter = nearest(names, diffCiede2000, name => palette[name]);
    }

    public async getSmartColorName(color: Color) {
        if (nearestNameGetter === null) {
            await this.setUpNearestName();
        }
        return nearestNameGetter ?
            nearestNameGetter(color, 1)[0]
            : "New color";
    }
}