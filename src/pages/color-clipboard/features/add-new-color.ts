import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";

export const addNewColorToClipboard = async (colorData: ColorData) => {
    console.time();
    const name = await getSmartColorName(colorData);
    const colorId = await invoke("create_color", { color: { ...colorData, name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addColor({...colorEntity, kind:"color"});
    console.timeEnd();
    console.log({...colorEntity, kind:"color"});
}