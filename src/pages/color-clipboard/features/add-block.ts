import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";
import { colorStringToData, randomColor } from "../../../infrastructure/utils/color-format-changer";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

export const addNewColorToClipboard = async (inputColor: string, paletteId: number | null) => {
    
    // const colorData = colorStringToData(inputColor);
    const colorData = randomColor();
    const name = await getSmartColorName(colorData);
    const colorId = await invoke<number>("create_color", { color: { ...colorData, name: name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().pushBlock(colorEntity, null);
    const blockId = colorEntity.blockId;

    useColorListCommands.getState().push({
        async undo() {
            await invoke("soft_delete_block", { blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
        async redo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId });
            useClipboardStore.getState().pushBlock(entity, null);
        },
    });
}

export const addNewPalette = async (blockIds: number[]) => {
    const paletteId = await invoke("create_palette", { palette: { name: "New palette", blockIds } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });
    useClipboardStore.getState().pushBlock(paletteEntity, null);
    return paletteId;
}