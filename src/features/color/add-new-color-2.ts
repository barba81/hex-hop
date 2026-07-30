import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import { getSmartColorName2 } from "./get-color-name";
import { useClipboardStore } from "@/store/use-cliboard-store";
import type { ColorEntity } from "@/infrastructure/entity";

export const addNewColor2 = async (colorData: ColorData) => {
    const name = await getSmartColorName2(colorData);
    const colorId = await invoke("create_color", { color: { ...colorData, name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addColor(colorEntity);
}