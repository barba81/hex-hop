import { invoke } from "@tauri-apps/api/core";
import type { ColorEntity,  } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { colorStringToData } from "../../../infrastructure/utils/color-format-changer";
import { Command } from "@/infrastructure/command/command-manager";
import { getSmartColorName } from "../features/get-color-name";

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