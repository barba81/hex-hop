import { ColorRequest, ColorEntity } from "@/shared/types/entity";
import { invoke } from "@tauri-apps/api/core";


export const colorApi = {
    async addColor(colorData: ColorRequest) {
        return await invoke<ColorEntity>("create_color", {
            color: colorData,
        });
    }

}