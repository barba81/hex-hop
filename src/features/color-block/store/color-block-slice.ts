import { colorService } from "@/features/color-block/service";
import { getColorMode } from "@/features/color-block/utils/color-format-changer";
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

export interface IColorBlockActions {
    addNewColor: (color: string, paletteId: number | null) => void;
}

export const createHexHopSlice: ImmerStateCreator<AppStore, IColorBlockInitialState & IColorBlockActions> = (set) => ({
    ...initialState,
    addNewColor: async (color: string, paletteId: number | null) => {
        const colorEntity = await colorService.addColor(color, paletteId);
        const colorMode = getColorMode(color);

        set((state: any) => {
            state.inputColor = color;
            if (colorMode) {
                state.isColorValid = true;
                state.colorMode = colorMode;
                state.validColor = color;
            } else {
                state.isColorValid = false;
            }
            state.blocksById[colorEntity.blockId] = colorEntity;
            state.blockIds[rootBlockId] = [
                colorEntity.blockId,
                ...(state.blockIds[paletteId ?? rootBlockId] || []),
            ];
            // historyPush({ async undo() { }, async redo() { } }, state.clipboardHistory);
        });
    },
});

export default createHexHopSlice;
