import type { PaletteData } from "@/infrastructure/models/types";
import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";
import { colorStringToData } from "../../../infrastructure/utils/color-format-changer";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

export const addNewColorToClipboard = async (inputColor: string, paletteId: number | null) => {

    const colorData = colorStringToData(inputColor);
    const name = await getSmartColorName(colorData);
    const colorId = await invoke<number>("create_color", { color: { ...colorData, name: name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addBlock(colorEntity);
    const blockId = colorEntity.blockId;


    useColorListCommands.getState().push({
        async undo() {
            await invoke("soft_delete_block", { blockId });
            useClipboardStore.getState().deleteBlock(blockId, paletteId);
        },
        async redo() {
            await invoke("restore_block", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId });
            useClipboardStore.getState().addBlock(entity);
        },
    });
}


export const addNewPalette = async (paletteData: PaletteData) => {
    const paletteId = await invoke("create_palette", { palette: { ...paletteData, name: "New palette" } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });
    useClipboardStore.getState().addBlock(paletteEntity);
    return paletteId;
}