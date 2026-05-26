import { ColorBlock, useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../infrastructure/client";
import { ColorDto, GradientDto, GradientLayerDto, GradientStopsDto, type PaletteDto } from "./get-all-data.types";
import { PaletteEntity } from "../infrastructure/entity/palette.entity";
import { ColorEntity } from "../infrastructure/entity/color.entity";
import _ from 'lodash';

export async function getAllData() {
    try {
        const db = getContext();
        const palettes = await db.select<PaletteDto[]>('SELECT * FROM palette');
        const colors = await db.select<ColorDto[]>('SELECT * FROM colors');
        const gradient = await db.select<GradientDto[]>('SELECT * FROM gradient');
        const gradientLayer = await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer');
        const gradientStop = await db.select<GradientStopsDto[]>('SELECT * FROM gradient_stop');




        const colorModels: ColorEntity[] = colors.map(x => {
            return {
                kind: "color",
                id: x.id,
                r: x.r,
                g: x.g,
                b: x.b,
                a: x.a,
                name: x.name,
                order: x.order,
                paletteId: x.paletteId
            };
        });


            const colorsId = _.groupBy(colorModels, 'paletteId');
            console.log(colorsId);
            //    const gradient1 = _.groupBy(gradient, 'id');
            //    const gradient2 = _.groupBy(gradientLayer, 'id');
            //    const gradient3 = _.groupBy(gradientId, 'id');

        const palletsModel: PaletteEntity[] = palettes.map(x => {
            return {
                kind: 'palette',
                id: x.id,
                order: x.order,
                name: x.name,
                children:  colorsId[x.id] ??[]
            };
        });

         const colorBlocks: ColorBlock[] = [...palletsModel, ...colorsId['null'] ?? []];


        useHexHopStore.getState().actions.setColorBlock(colorBlocks);


    } catch (error) {
        console.error("Failed to fetch all data:", error);
        return [];
    }

}