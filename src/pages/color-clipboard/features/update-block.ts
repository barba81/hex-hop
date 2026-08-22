import type { ColorEntity, GradientEntity, PaletteEntity } from "@/infrastructure/models/entity"
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
            await invoke("update_palette", { paletteUpdate: { ...oldEntityCopy } });
            const paletteEntity = await invoke<ColorEntity>("get_palette_meta_data", { paletteId: newEntity.id });
            useClipboardStore.getState().updateBlock(paletteEntity);
        },
        async redo() {
            await invoke("update_palette", { paletteUpdate: { ...newEntity } });
            const paletteEntity = await invoke<ColorEntity>("get_palette_meta_data", { paletteId: newEntity.id });
            useClipboardStore.getState().updateBlock(paletteEntity);
        },
    });
}

export const updateGradientBlock = async (newEntity: GradientEntity, oldEntity: GradientEntity) => {
    const oldEntityCopy = { ...oldEntity };

    await invoke("update_gradient", { gradient: { ...newEntity } });
    const paletteEntity = await invoke<GradientEntity>("get_gradient", { gradientId: oldEntityCopy.id });

    useClipboardStore.getState().updateBlock(paletteEntity);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("update_gradient", { gradient: { ...oldEntityCopy } });
            const paletteEntity = await invoke<GradientEntity>("get_gradient", { gradientId: newEntity.id });
            useClipboardStore.getState().updateBlock(paletteEntity);
        },
        async redo() {
            await invoke("update_gradient", { gradient: { ...newEntity } });
            const paletteEntity = await invoke<GradientEntity>("get_gradient", { gradientId: newEntity.id });
            useClipboardStore.getState().updateBlock(paletteEntity);
        },
    });
}