import { useColorStore } from "@/store/useColorStore";
import { getContext } from "../Infrastructure/client";
import { ColorDto, GradientDto, GradientLayerDto, GradientStopsDto, type PaletteDto } from "./GetAllData.types";

export async function GetAllData() {
    try {
        const db = getContext();
        let palettes = await db.select<PaletteDto[]>('SELECT * FROM palette');
        let colors = await db.select<ColorDto[]>('SELECT * FROM colors');
        let gradient = await db.select<GradientDto[]>('SELECT * FROM gradient');
        let gradientLayer = await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer');
        let gradientStop = await db.select<GradientStopsDto[]>('SELECT * FROM gradient_stop');
    } catch (error) {
        console.error("Failed to fetch all data:", error);
        return [];
    }
    

}