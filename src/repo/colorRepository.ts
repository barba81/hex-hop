import { ColorEntity } from '@/model/color';
import Database from '@tauri-apps/plugin-sql';


const db = await Database.load('sqlite:colorClipboard.db');

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

    static async addColor(color: ColorEntity) {
        try {
            const result = await db.select<any[]>(
                'INSERT INTO colors (r, g, b, a) VALUES ($1, $2, $3, $4) RETURNING id',
                [color.r, color.g, color.b, color.a]
            );
            const id =  result[0]?.id ?? 0;
            color.id = id;
            return id;
        } catch (error) {
            console.error("Failed to insert color", error);
            return 0;
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

