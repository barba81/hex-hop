import { ColorBlock, useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import { ColorDto, GradientDto, GradientLayerDto, GradientStopsDto, type PaletteDto } from "./get-all-data.types";
import { PaletteEntity } from "../infrastructure/domain/palette.entity";
import _ from 'lodash';
import { ColorEntity } from "../infrastructure/domain/color.entity";

export async function getAllData() {
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

        const colorModels: ColorEntity[] = colors.map(x => {
             return {
                id: x.id,
                r: x.r,
                g: x.g,
                b: x.b,
                a: x.a,
                name: x.name,
                order: x.order,
            };
        });


        const palletsModel: PaletteEntity[] = palettes.map(x => {
            return {
                id: x.id,
                order: x.order,
                name: x.name,
                children: []
            };
        });

         const colorBlocks: ColorBlock[] = [...palletsModel, ...colorModels];


        useHexHopStore.getState().actions.setColorBlock(colorBlocks);


    } catch (error) {
        console.error("Failed to fetch all data:", error);
        return [];
    }

}