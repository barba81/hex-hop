import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";

export const addNewColor2 = async (colorData: ColorData) =>{
    const colorId =  await invoke("create_color", {color: colorData});
    console.log(colorId);   
}