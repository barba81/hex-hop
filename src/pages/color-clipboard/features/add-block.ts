import type { PaletteData } from "@/infrastructure/models/types";
import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { getSmartColorName } from "./get-color-name";
import { colorStringToData } from "../../../infrastructure/utils/color-format-changer";
import { Command } from "@/infrastructure/command/command-manager";

export const addNewColorToClipboard = async (inputColor: string) => {
    const colorData = colorStringToData(inputColor);
    const name = await getSmartColorName(colorData);
    const colorId = await invoke<number>("create_color", { color: { ...colorData, name: name } });
    const colorEntity = await invoke<ColorEntity>("get_color", { colorId });
    useClipboardStore.getState().addBlock(colorEntity);
}

export class AddNewColorToClipboardCommand implements Command {
    private blockId!: number;
    private colorId!: number;

    constructor( private inputColor: string, private paletteId: number | null ) { }

    async execute(): Promise<void> {
        const colorData = colorStringToData(this.inputColor);
        const name = await getSmartColorName(colorData);

        this.colorId = await invoke<number>("create_color", { color: { ...colorData, name, }, });
        const colorEntity = await invoke<ColorEntity>("get_color", { colorId: this.colorId, });

        useClipboardStore.getState().addBlock(colorEntity);
        this.blockId = colorEntity.blockId;
    }

    async undo(): Promise<void> {
        await invoke("soft_delete_block", { blockId: this.blockId, });
        useClipboardStore.getState().deleteBlock(this.blockId, this.paletteId);
    }

    async redo(): Promise<void> {
        await invoke("restore_block", { blockId: this.blockId, });
        const colorEntity = await invoke<ColorEntity>("get_color", { colorId: this.colorId, });
        useClipboardStore.getState().addBlock(colorEntity);
    }
}

export const addNewPalette = async (paletteData: PaletteData) => {
    const paletteId = await invoke("create_palette", { palette: { ...paletteData, name: "New palette" } });
    const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });
    useClipboardStore.getState().addBlock(paletteEntity);
}