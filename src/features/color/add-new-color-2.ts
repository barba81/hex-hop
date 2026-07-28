import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";

export const addNewColor2 = async (colorData: ColorData) =>{
    console.time("test");

     await invoke("create_color", {color: colorData});
    console.timeEnd("test");       
}