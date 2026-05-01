import { ColorData, type ColorEntity } from '@/model/color';
import Database from '@tauri-apps/plugin-sql';

const db = await Database.load('sqlite:hexHop.db');

export class ColorRepository {

    static async getAllColors() {
        try {
            return await db.select<ColorEntity[]>(
                'SELECT * FROM colors ORDER BY  created_at DESC',
            );
        } catch (error) {
            console.error("Failed to fetch colors:", error);
            return [];
        }
    }

    static async addColor(colorData: ColorData) {
        try {
            const result = await db.select<ColorEntity[]>(
                'INSERT INTO colors (r, g, b, a) VALUES ($1, $2, $3, $4) RETURNING id',
                [colorData.r, colorData.g, colorData.b, colorData.a]
            );
            return  {...colorData, id:result[0]?.id ?? 0};
        } catch (error) {
            console.error("Failed to insert color", error);
        }
    }

    static async updateColor(color: ColorEntity) {
        try {
            await db.execute(
                'UPDATE  colors  SET r = $1, g = $2, b = $3, a=$4 WHERE id = $4',
                [ color.r, color.g, color.b, color.a]
            );
        } catch (error) {
            console.error("Failed to update colors:", error);
        }
    }

    static async deleteById(color: ColorEntity) {
        try {
            await db.execute(
                'DELETE FROM  colors WHERE id = $1  ',
                [color.id]
            );
        } catch (error) {
            console.error("Failed to delete color:", error);
        }
    }

    static async deleteAll() {
        try {
            await db.execute(
                'DELETE FROM  colors',
            );
        } catch (error) {
            console.error("Failed to delete colors:", error);
        }
    }
}

