import Database from '@tauri-apps/plugin-sql';
import { v4 as uuidv4 } from "uuid";

const db = await Database.load('sqlite:colorClipboard.db');
export class ColorRepository {
    static async addColor(color: string) {
        const id = uuidv4();
        const result = await db.execute(
            'INSERT into todos (id, color) VALUES ($1, $2)',
            [id, color]
        );

    }
}

