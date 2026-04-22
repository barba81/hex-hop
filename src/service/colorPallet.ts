import { ColorEntity } from "@/model/color";
import { ColorFormat } from "@/model/colorFormat";
import { ColorRepository } from "@/repo/colorRepository";
import { useColorStore } from "@/store/useColorStore";

export class ColorPallet {
    static async LoadAllColor() {
        const colors = await ColorRepository.getAllColors();
        useColorStore.getState().addAllColor(colors);
    }

    static async PinFlipColor(color: ColorEntity) {
        color.pinned = 1.0 - color.pinned;
        await ColorRepository.updateColor(color);
    }
    
    static async DeleteById(color: ColorEntity) {
        await ColorRepository.deleteById(color);
        useColorStore.getState().deleteById(color.id);
    }

    static async ClearAll() {
        await ColorRepository.deleteAll();
        useColorStore.getState().deleteAll();
    }

    static async CopyToClipboard(colorId: number, colorFormat: ColorFormat){

    }
}