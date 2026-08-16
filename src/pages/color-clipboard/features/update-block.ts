import type { ColorEntity } from "@/infrastructure/models/entity"
import { invoke } from "@tauri-apps/api/core";
import { useClipboardStore } from "../store/use-clipboard-store";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

export const updateColorBlock = async (newEntity: ColorEntity) => {
    const oldEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });

    await invoke("update_color", { color: { ...newEntity } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId: newEntity.id });

    useClipboardStore.getState().updateBlock(colorEntity);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("update_color", { color: { ...oldEntity } });
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