import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export const getContext = async (): Promise<Database> => {
    if (!dbInstance) {
        // Replace with your actual connection string
        dbInstance = await Database.load('sqlite:hexHop.db');
    }
    return dbInstance;
};