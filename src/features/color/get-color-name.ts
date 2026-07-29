import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import {
    nearest,
    differenceCiede2000,
} from 'culori';
import { colorDataToHex } from "./color-format-changer";

let nearestNamedColorsCiede2000: any = null;

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
    nearestNamedColorsCiede2000 = nearest(names, diffCiede2000, name => palette[name]);

}


export const getSmartColorName2 = async (color: ColorData) => {
    if (nearestNamedColorsCiede2000 === null) {
        await setUpNearestName();
    }
    const nearestNames = nearestNamedColorsCiede2000(colorDataToHex(color), 1);
    return nearestNames[0];
}