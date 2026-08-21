import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";
import type { ColorEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const duplicateBlock = async (colorData: ColorEntity) => {
    const colorId = await invoke("create_color", { color: { ...colorData, name:colorData.name+" Copy" } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    const blockId = colorEntity.blockId;
    const paletteId = colorEntity.parentPaletteId;

    useClipboardStore.getState().addBlock(colorEntity, paletteId);

    useColorListCommands.getState().push({
        async undo() {
            await invoke("soft_delete_block", { blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
        async redo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId });
            useClipboardStore.getState().addBlock(entity, paletteId);
        },
    });
    
}