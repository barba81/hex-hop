import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity"
import { invoke } from "@tauri-apps/api/core";
import { useClipboardStore } from "../store/use-clipboard-store";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

export const updateColorBlock = async (newEntity: ColorEntity, oldEntity: ColorEntity) => {
    const oldEntityCopy = { ...oldEntity };

    await invoke("update_color", { color: { ...newEntity } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });

    useClipboardStore.getState().updateBlock(colorEntity);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("update_color", { color: { ...oldEntityCopy } });
            const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
        async redo() {
            await invoke("update_color", { color: { ...newEntity } });
            const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
    });
}

export const updatePaletteBlock = async (newEntity: PaletteEntity, oldEntity: PaletteEntity) => {
    const oldEntityCopy = { ...oldEntity };

    await invoke("update_palette", { paletteUpdate: { ...newEntity } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette_meta_data", { paletteId: newEntity.id });

    useClipboardStore.getState().updateBlock(paletteEntity);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("update_palette", { palette: { ...oldEntityCopy } });
            const colorEntity = await invoke<ColorEntity>("get_palette_meta_data", { paletteId: newEntity.id });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
        async redo() {
            await invoke("update_palette", { palette: { ...newEntity } });
            const colorEntity = await invoke<ColorEntity>("get_palette_meta_data", { paletteId: newEntity.id });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
    });
}