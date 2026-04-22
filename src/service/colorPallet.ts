import { ColorFormat } from "@/model/colorFormat";
import { ColorRepository } from "@/repo/colorRepository";
import { useColorStore } from "@/store/useColorStore";

export class ColorPallet {
    static async LoadAllColor() {
        const colors = await ColorRepository.getAllColors();
        useColorStore.getState().addAllColor(colors);
    }

    static async PinFlipColor(colorId: number) {

    }

    static async CopyToClipboard(colorId: number, colorFormat: ColorFormat){

    }

    static async DeleteById(colorId: number) {

    }
    static async ClearAll() {

    }
}