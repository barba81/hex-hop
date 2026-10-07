import { defaultInputColor } from "@/shared/data/const-data";
import { AppStore, SetCallback } from "@/shared/store/app-store";
import { ImmerStateCreator } from "@/shared/types";
import { Color } from "culori";

export interface IColorBlockInitialState {
    isColorValid: boolean;
    validColor: string;
    inputColor: string;
    colorMode: Color["mode"];
}

export const initialState: IColorBlockInitialState = {
    isColorValid: true,
    validColor: defaultInputColor,
    inputColor: defaultInputColor,
    colorMode: "rgb",
}


export const createHexHopSlice: ImmerStateCreator<AppStore, IColorBlockInitialState > = () => ({
    ...initialState, 
});

export default createHexHopSlice;
