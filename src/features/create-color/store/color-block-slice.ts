import { colorService } from "@/features/color-block/service";
import { getColorMode, validateColor } from "@/features/create-color-block/utils/color-format-changer";
import { defaultInputColor, rootBlockId } from "@/shared/data/const-data";
import { AppStore, ImmerStateCreator } from "@/shared/store/app-store";
import { Color } from "culori";

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
    addNewColor: async (stringColor: string, paletteId: number | null) => {
        const colorEntity = await colorService.addColor(stringColor, paletteId);
        if (!colorEntity) {
            set((state) => { state.isColorValid = false; });
            return;
        }

        set((state) => {
            state.isColorValid = true;
            state.inputColor = stringColor;
            state.lastValidColor = stringColor;
            state.colorMode = getColorMode(stringColor) ?? "rgb";
            state.blocksById[colorEntity.blockId] = colorEntity;
            state.blockIds[rootBlockId] = [
                colorEntity.blockId,
                ...(state.blockIds[paletteId ?? rootBlockId] || []),
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
