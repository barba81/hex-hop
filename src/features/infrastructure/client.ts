import Database from "@tauri-apps/plugin-sql";

const db = await Database.load('sqlite:hexHop.db');

export function getContext(){
    return db;
}