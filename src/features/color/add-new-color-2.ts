import { ColorEntity } from "@/infrastructure/entity";
import { ColorData } from "@/infrastructure/types";
import { invoke } from "@tauri-apps/api/core";
import { getSmartColorName2 } from "./get-color-name";

export const addNewColor2 = async (colorData: ColorData) =>{
    console.time("set up name system");
    const name = await getSmartColorName2(colorData);
    console.timeLog("set up name system");
    await invoke("create_color", {color: {...colorData, name}});
    console.timeEnd("set up name system");
}
