import { ColorEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const duplicateBlock = async (colorData: ColorEntity) => {
    const colorId = await invoke("create_color", { color: { ...colorData, name:colorData.name+" Copy" } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addBlock(colorEntity);
    console.log(colorData);
    console.log(colorEntity);
}