import { ColorBlock, useHexHopStore } from "@/store/use-hex-hop-store";
import { getContext } from "../../infrastructure/client";
// import { ColorDto, GradientDto, GradientLayerDto, GradientStopsDto, type PaletteDto } from "./get-all-data.types";
import { ColorDto, type PaletteDto } from "./get-all-data.types";
import { PaletteEntity } from "../../infrastructure/entity/palette.entity";
import { ColorEntity } from "../../infrastructure/entity/color.entity";
import _ from 'lodash';

export async function getAllData() {
    try {
        const db = getContext();
        const palettes = await db.select<PaletteDto[]>(`
            SELECT
                palette.id,
                palette.name,
                b.id AS blockId,
                b.[order]
            FROM palette
            INNER JOIN block b ON palette.blockId = b.id
        `);

        const colors = await db.select<ColorDto[]>(`SELECT
                    c.id,
                    c.paletteId,
                    c.r,
                    c.g,
                    c.b,
                    c.a,
                    c.name,
                    b.id AS blockId,
                    b.[order]
                FROM color c
         INNER JOIN block b ON c.blockId = b.id`);
        // const gradient = await db.select<GradientDto[]>('SELECT * FROM gradient');
        // const gradientLayer = await db.select<GradientLayerDto[]>('SELECT * FROM gradient_layer');
        // const gradientStop = await db.select<GradientStopsDto[]>('SELECT * FROM gradient_stop');

        const colorModels: ColorEntity[] = colors.map(x => {
            return {
                kind: "color",
                id: x.id,
                blockId: x.blockId,
                r: x.r,
                g: x.g,
                b: x.b,
                a: x.a,
                name: x.name,
                order: x.order,
                paletteId: x.paletteId
            };
        });

        //    const gradient1 = _.groupBy(gradient, 'id');
        //    const gradient2 = _.groupBy(gradientLayer, 'id');
        //    const gradient3 = _.groupBy(gradientId, 'id');

        const palletsModel: PaletteEntity[] = palettes.map(x => {
            return {
                kind: 'palette',
                id: x.id,
                blockId: x.blockId,
                order: x.order,
                name: x.name,
            };
        });
        const colorBlocks: ColorBlock[] = [...palletsModel, ...colorModels, ];

        useHexHopStore.getState().actions.setColorBlock(colorBlocks);
    } catch (error) {
        console.error("Failed to fetch all data:", error);
        return [];
    }

}