import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import { getSmartColorName2 } from "./get-color-name";
import type { ColorEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";

export const addNewColorToClipboard = async (colorData: ColorData) => {
    console.time();
    const name = await getSmartColorName2(colorData);
    const colorId = await invoke("create_color", { color: { ...colorData, name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addColor({...colorEntity, kind:"color"});
    console.timeEnd();
    console.log({...colorEntity, kind:"color"});
}