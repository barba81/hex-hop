
import { colorStringToColor, getColorMode } from "@/features/block-list/utils/color-format-changer";
import { getSmartColorName, toRgb } from "@/features/block-list/utils/create-color-name";
import { colorApi } from "@/shared/api/color-api";
import { defaultInputColor, rootBlockId } from "@/shared/data/const-data";
import { AppStore, ImmerStateCreator } from "@/shared/store/app-store";
import { ColorRequest } from "@/shared/types/entity";
import { Color } from "culori";
import { nanoid } from "nanoid";

interface IColorBlockInitialState {
    isColorValid: boolean;
    lastValidColor: string;
    inputColor: string;
    colorMode: Color["mode"];
}

const initialState: IColorBlockInitialState = {
    isColorValid: true,
    lastValidColor: defaultInputColor,
    inputColor: defaultInputColor,
    colorMode: "rgb",
}

interface IColorBlockActions {
    addNewColor: (stringColor: string, paletteId: number | null) => void;
    handleColorChange: (stringColor: string) => void;
}

export type ColorBlockSlice = IColorBlockInitialState & IColorBlockActions;

export const colorBlockSlice: ImmerStateCreator<AppStore, ColorBlockSlice> = (set) => ({
    ...initialState,
    addNewColor: async (stringColor: string, parentPaletteId: number | null) => {
        const stringColorMode = getColorMode(stringColor);

        if (!stringColorMode) {
            set((state) => { state.isColorValid = false; });
            return;
        }

        const color = colorStringToColor(stringColor);
        const name = await getSmartColorName(color);
        const { mode, ...rgb } = toRgb(color);

        const colorEntity = await colorApi.addColor({
            ...rgb,
            id: nanoid(),
            name,
            parentPaletteId,
        } as ColorRequest);


        set((state) => {
            state.isColorValid = true;
            state.inputColor = stringColor;
            state.lastValidColor = stringColor;
            state.colorMode = stringColorMode;
            state.blocksById[colorEntity.blockId] = colorEntity;
            state.blockIds[rootBlockId] = [
                colorEntity.blockId,
                ...(state.blockIds[parentPaletteId ?? rootBlockId] || []),
            ];
            // historyPush({ async undo() { }, async redo() { } }, state.clipboardHistory);
        });
    },

    handleColorChange: (color) => {
        const colorMode = getColorMode(color);
        set((state) => {
            state.inputColor = color;

            if (!colorMode) {
                state.isColorValid = false;
                return;
            }

            state.isColorValid = true;
            state.colorMode = colorMode;
            state.lastValidColor = color;
        });
    },


});

export default colorBlockSlice;
