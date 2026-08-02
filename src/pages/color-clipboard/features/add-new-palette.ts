import type {  PaletteData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import type { PaletteEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";

export const addNewPalette = async (paletteData: PaletteData) => {
    const paletteId = await invoke("create_palette", { palette: { ...paletteData, name:"New palette" } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });
    useClipboardStore.getState().addBlock(paletteEntity);
    console.timeEnd();
    console.log(paletteEntity);
}