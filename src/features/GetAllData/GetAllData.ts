import { useColorStore } from "@/store/useColorStore";
import { getContext } from "../Infrastructure/client";
import { ColorDto, GradientDto, GradientLayerDto, GradientStops, type PaletteDto } from "./GetAllData.types";

export async function LoadAllColor() {
    const db = getContext();
    try {
        let palettes = await db.select<PaletteDto[]>('SELECT * FROM palette');
        let colors = await db.select<ColorDto[]>('SELECT * FROM colors');
        let gradient = await db.select<GradientDto[]>('SELECT * FROM gradient');
        let gradientLayer = await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer');
        let gradientStop = await db.select<GradientStops[]>('SELECT * FROM gradient_stop');
        debugger;
        // useColorStore.getState().addAllColor(palettes);
    } catch (error) {
        console.error("Failed to fetch colors:", error);
        return [];
    }
}