import { defaultInputColor } from "@/shared/data/const-data";
import { SetCallback } from "@/shared/store/app-store";
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

const actions = (set: SetCallback<IColorBlockInitialState>) => ({

});


const slice = (set: SetCallback<IColorBlockInitialState>) => ({
  ...initialState,
  ...actions(set),
});

export type TColorBlockActions = ReturnType<typeof actions>;

const colorBlockSliceStore = {
  slice,
  initialState,
};

export default colorBlockSliceStore;
