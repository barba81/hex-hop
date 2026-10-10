
import { BlockEntity } from "@/features/block-list/block-list/types/entity";
import { colorStringToColor, getColorMode } from "@/features/block-list/utils/color-format-changer";
import { getSmartColorName, toRgb } from "@/features/block-list/utils/create-color-name";
import { colorApi } from "@/shared/api/color-api";
import { defaultInputColor, rootBlockId } from "@/shared/data/const-data";
import { AppStore, ImmerStateCreator } from "@/shared/store/app-store";
import { ColorRequest } from "@/shared/types/entity";
import { Color } from "culori";
import { nanoid } from "nanoid";

interface IColorBlockInitialState {
    blockPaletteList: Record<number, number[]>;
    blocksById: Record<number, BlockEntity>;
    editedBlockId: number | null,

    isColorValid: boolean;
    lastValidColor: string;
    inputColor: string;
    colorMode: Color["mode"];
}

const initialState: IColorBlockInitialState = {
    blockPaletteList: { [rootBlockId]: [] },
    blocksById: {},
    editedBlockId: null,

    isColorValid: true,
    lastValidColor: defaultInputColor,
    inputColor: defaultInputColor,
    colorMode: "rgb",
}

interface IColorBlockActions {
    addNewColor: (stringColor: string, paletteId: number | null) => void;
    handleColorChange: (stringColor: string) => void;
    setEditBlock: (blockId: number | null) => void;
}

export type ColorBlockSlice = IColorBlockInitialState & IColorBlockActions;

export const clipboardSlice: ImmerStateCreator<AppStore, ColorBlockSlice> = (set) => ({
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
            state.blockPaletteList[rootBlockId] = [
                colorEntity.blockId,
                ...(state.blockPaletteList[parentPaletteId ?? rootBlockId] || []),
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
    
    setEditBlock: (blockId) => {
        set((state) => { state.editedBlockId = blockId })
    }
});

export default clipboardSlice;
