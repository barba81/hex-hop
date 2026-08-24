import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";
import { colorStringToData } from "@/infrastructure/utils/color-format-changer";

export const addNewColorToClipboard = async (inputColor: string, paletteId: number | null) => {
    
    const colorData = colorStringToData(inputColor);
    // const colorData = randomColor();
    const name = await getSmartColorName(colorData);
    const colorEntity = await invoke<ColorEntity>("create_color", { color: { ...colorData, name: name } });
    useClipboardStore.getState().pushBlock(colorEntity, null);
    const blockId = colorEntity.blockId;

    useColorListCommands.getState().push({
        async undo() {
            await invoke("soft_delete_block", { blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
        async redo() {
            const entity = await invoke<ColorEntity>("restore_color", { colorId:colorEntity.id });
            useClipboardStore.getState().pushBlock(entity, null);
        },
    });
}

export const addNewPalette = async (blockIds: number[]) => {
    const paletteEntity = await invoke<PaletteEntity>("create_palette", { palette: { name: "New palette", blockIds } });
    useClipboardStore.getState().pushPalette(paletteEntity, blockIds);
    const blockId = paletteEntity.blockId;
    const paletteId = paletteEntity.id;

      useColorListCommands.getState().push({
        async undo() {
            await invoke("soft_delete_block", { blockId });
            useClipboardStore.getState().deleteBlock(blockId, null);
        },
        async redo() {
            const entity = await invoke<PaletteEntity>("restore_palette", { paletteId:paletteId});
            useClipboardStore.getState().pushPalette(entity, blockIds);
        },
    });

}