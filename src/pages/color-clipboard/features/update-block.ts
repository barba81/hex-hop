
import type { ColorEntity, GradientEntitySummary, PaletteEntitySummary } from "@/infrastructure/models/entity"
import { invoke } from "@tauri-apps/api/core";
import { useClipboardStore } from "../store/clipboard-store";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

export const updateColorBlock = async (newEntity: ColorEntity, oldEntity: ColorEntity) => {
    const oldEntityCopy = { ...oldEntity };

    await invoke("update_color", { color: { ...newEntity } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });

    useClipboardStore.getState().updateBlock(colorEntity);

    useColorListCommands.getState().push({
        async undo() {
            const colorEntity = await invoke<ColorEntity>("update_color", { color: { ...oldEntityCopy } });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
        async redo() {
            const colorEntity =  await invoke<ColorEntity>("update_color", { color: { ...newEntity } });
            useClipboardStore.getState().updateBlock(colorEntity);
        },
    });
}

export const updatePaletteBlock = async (newEntity: PaletteEntitySummary, oldEntity: PaletteEntitySummary) => {
    const oldEntityCopy = { ...oldEntity };

    const paletteEntity = await invoke<PaletteEntitySummary>("update_palette_summary", { paletteUpdate: { ...newEntity } });
    useClipboardStore.getState().updateBlockSummary(paletteEntity);

    useColorListCommands.getState().push({
        async undo() {
            const paletteEntity = await invoke<PaletteEntitySummary>("update_palette_summary", { paletteUpdate: { ...oldEntityCopy } });
            useClipboardStore.getState().updateBlockSummary(paletteEntity);
        },
        async redo() {
            const paletteEntity = await invoke<PaletteEntitySummary>("update_palette_summary", { paletteUpdate: { ...newEntity } });
            useClipboardStore.getState().updateBlockSummary(paletteEntity);
        },
    });
}

export const updateGradientBlock = async (newEntity: GradientEntitySummary, oldEntity: GradientEntitySummary) => {
    const oldEntityCopy = { ...oldEntity };

    const gradientSummary = await invoke<GradientEntitySummary>("update_gradient_summary", { gradientRequest: { ...newEntity } });
    useClipboardStore.getState().updateBlockSummary(gradientSummary);

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

