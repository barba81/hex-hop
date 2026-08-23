
import type { ColorEntity, GradientEntity, GradientEntitySummary, PaletteEntity, PaletteEntitySummary } from "@/infrastructure/models/entity"
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

export const updatePaletteBlock = async (newEntity: PaletteEntitySummary, oldEntity: PaletteEntitySummary) => {
    const oldEntityCopy = { ...oldEntity };
    console.time();
    await invoke("update_palette", { paletteUpdate: { ...newEntity } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette_meta_data", { paletteId: newEntity.id });

    useClipboardStore.getState().updateBlockSummary(paletteEntity);
    console.timeEnd();

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

export const updateGradientBlock = async (newEntity: GradientEntitySummary, oldEntity: GradientEntitySummary) => {
    const oldEntityCopy = { ...oldEntity };
    console.time();
    const gradientSummary = await invoke<GradientEntitySummary>("update_gradient_summary", { gradientRequest: { ...newEntity } });
    useClipboardStore.getState().updateBlockSummary(gradientSummary);
    console.timeEnd();

    useColorListCommands.getState().push({
        async undo() {
            const gradientSummary = await invoke<GradientEntitySummary>("update_gradient_summary", { gradientRequest: { ...oldEntityCopy } });
            useClipboardStore.getState().updateBlockSummary(gradientSummary);
        },
        async redo() {
            const gradientSummary = await invoke<GradientEntitySummary>("update_gradient_summary", { gradientRequest: { ...newEntity } });
            useClipboardStore.getState().updateBlockSummary(gradientSummary);
        },
    });

}

