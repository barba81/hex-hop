
import { BlockEntity } from "@/features/block-list/block-list/types/entity";
import { colorStringToColor, getColorMode } from "@/features/block-list/utils/color-format-changer";
import { getSmartColorName, toRgb } from "@/features/block-list/utils/create-color-name";
import { colorApi } from "@/shared/api/color-api";
import { rootBlockId } from "@/shared/data/const-data";
import { AppStore, ImmerStateCreator } from "@/shared/store/app-store";
import { ColorRequest } from "@/shared/types/entity";
import { nanoid } from "nanoid";

interface IClipBoardState {
    blockPaletteList: Record<number, number[]>;
    blocksById: Record<number, BlockEntity>;
    editedBlockId: number| null,
}

const initialState: IClipBoardState = {
    blockPaletteList: { [rootBlockId]: [] },
    blocksById: {},
    editedBlockId: null
}

interface IClipBoardActions {
    setEditBlock: (blockId: number | null) => void;
}

export type ClipboardSlice = IClipBoardState & IClipBoardActions;

export const clipboardSlice: ImmerStateCreator<AppStore, ClipboardSlice> = (set) => ({
    ...initialState,
    setEditBlock: (blockId) => {
        set((state) => {state.editedBlockId = blockId})
    }
});

export default clipboardSlice;
