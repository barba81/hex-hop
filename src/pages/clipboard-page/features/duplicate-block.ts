import type { ColorEntity } from "@/infrastructure/models/entity";
import { useAppStore } from "@/store/app-store";
import { invoke } from "@tauri-apps/api/core";

export const duplicateBlock = async (colorData: ColorEntity) => {
    const colorEntity = await invoke<ColorEntity>("create_color", { color: { ...colorData, name:colorData.name+" Copy" } });
    const blockId = colorEntity.blockId;
    const paletteId = colorEntity.parentPaletteId;


    useAppStore.getState().pushBlock(colorEntity, paletteId);

    // useColorListCommands.getState().push({
    //     async undo() {
    //         await invoke("soft_delete_block", { blockId });
    //         useAppStore.getState().deleteBlock(blockId, paletteId);
    //     },
    //     async redo() {
    //         await invoke("restore_block", { blockId });
    //         const entity = await invoke<ColorEntity>("get_color", {  colorId:colorEntity.id  });
    //         useAppStore.getState().pushBlock(entity, paletteId);
    //     },
    // });
}