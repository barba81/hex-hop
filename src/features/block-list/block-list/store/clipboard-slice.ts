import { colorStringToColor, getColorMode } from "@/features/create-color/utils/color-format-changer";
import { getSmartColorName, toRgb } from "@/features/create-color/utils/create-color-name";
import { BlockEntity } from "@/features/block-list/block-list/types/entity";
import { colorApi } from "@/shared/api/color-api";
import { rootBlockId } from "@/shared/data/const-data";
import { AppStore, ImmerStateCreator } from "@/shared/store/app-store";
import { ColorRequest } from "@/shared/types/entity";
import { nanoid } from "nanoid";

interface IClipBoardState {
    blockIds: Record<string, number[]>;
    blocksById: Record<string, BlockEntity>;
}

const initialState: IClipBoardState = {
    blockIds: { [rootBlockId]: [] },
    blocksById: {},
}

interface IClipBoardActions {

}

export type ClipboardSlice = IClipBoardState & IClipBoardActions;

export const clipboardSlice: ImmerStateCreator<AppStore, ClipboardSlice> = (set) => ({
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



});

export default clipboardSlice;
