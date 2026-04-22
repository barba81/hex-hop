import { ColorEntity } from '@/model/color';
import Database from '@tauri-apps/plugin-sql';


const db = await Database.load('sqlite:colorClipboard.db');

export class ColorRepository {

    static async getAllColors() {
        try {
            return await db.select<ColorEntity[]>(
                'SELECT * FROM colors',
            );
        } catch (error) {
            console.error("Failed to fetch colors:", error);
            return [];
        }
    }

    static async addColor(color: ColorEntity) {
        try {
            const result = await db.select<any[]>(
                'INSERT INTO colors (r, g, b, a) VALUES ($1, $2, $3, $4) RETURNING id',
                [color.r, color.g, color.b, color.a]
            );

            return result[0]?.id ?? 0;
        } catch (error) {
            console.error("Failed to insert color", error);
            return 0;
        }
    }

    static async updateColor(color: ColorEntity) {
        try {
            await db.execute(
                'UPDATE  colors  SET pinned = $2 WHERE id = $1',
                [color.id, color.pinned]
            );
            debugger;
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

