import { ColorBlock, useHexHopStore } from "@/store/useHexHopStore";
import { getContext } from "../Infrastructure/client";
import { ColorDto, GradientDto, GradientLayerDto, GradientStopsDto, type PaletteDto } from "./GetAllData.types";
import { Palette } from "../Infrastructure/Domain/Palette.model";
import _ from 'lodash';

export async function GetAllData() {
    try {
        const db = getContext();
        const palettes = await db.select<PaletteDto[]>('SELECT * FROM palette');
        const colors = await db.select<ColorDto[]>('SELECT * FROM colors');
        const gradient = await db.select<GradientDto[]>('SELECT * FROM gradient');
        const gradientLayer = await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer');
        const gradientStop = await db.select<GradientStopsDto[]>('SELECT * FROM gradient_stop');



    //    const colorsId = _.groupBy(colors, 'id');
    //    const gradient1 = _.groupBy(gradient, 'id');
    //    const gradient2 = _.groupBy(gradientLayer, 'id');
    //    const gradient3 = _.groupBy(gradientId, 'id');




        const palletsModel: Palette[] = palettes.map(x => {
            return {
                id: x.id,
                order: x.order,
                name: x.name,
                children: []
            };
        });

         const colorBlocks: ColorBlock[] = [...palletsModel];


        useHexHopStore.getState().actions.setColorBlock(colorBlocks);


    } catch (error) {
        console.error("Failed to fetch all data:", error);
        return [];
    }

}