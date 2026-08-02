import type { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";

export const addNewColorToClipboard = async (colorData: ColorData) => {
    const name = await getSmartColorName(colorData);
    const colorId = await invoke("create_color", { color: { ...colorData, name:name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addBlock(colorEntity);
}