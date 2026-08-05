import type { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import type {
    Color} from 'culori';
import {
    nearest,
    differenceCiede2000
} from 'culori/fn';
import { colorDataToHex } from "./color-format-changer";

let nearestNameGetter: ((color: Color | string, n?: number, τ?: number) => string[]) | null = null;

const setUpNearestName = async () => {
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


export const getSmartColorName = async (color: ColorData) => {
    if (nearestNameGetter === null) {
        await setUpNearestName();
    }
    return nearestNameGetter ?
    nearestNameGetter(colorDataToHex(color), 1)[0]
    : "New color";
}