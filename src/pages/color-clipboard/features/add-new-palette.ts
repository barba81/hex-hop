import {  PaletteData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import type { PaletteEntity } from "@/infrastructure/entity";
import { useClipboardStore } from "@/store/use-clipboard-store";

export const addNewPalette = async (paletteData: PaletteData) => {
    const paletteId = await invoke("create_palette", { color: { ...paletteData } });
    const colorEntity = await invoke<PaletteEntity>("get_palette", { paletteId });
    useClipboardStore.getState().addBlock(colorEntity);
    console.timeEnd();
}