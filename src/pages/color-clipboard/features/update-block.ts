import type { ColorEntity } from "@/infrastructure/models/entity"
import { invoke } from "@tauri-apps/api/core";
import { useClipboardStore } from "../store/use-clipboard-store";

export const updateColorBlock = async (newEntity: ColorEntity) => {
    await invoke("update_color", { color: { ...newEntity} });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });
    useClipboardStore.getState().updateBlock(colorEntity);

}