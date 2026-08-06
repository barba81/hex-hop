import { DragDots } from "@/components/common/drag-dots";
import { ColorEntity, GradientEntity } from "@/infrastructure/entity";
import { colorDataToRoundData } from "../features/color-format-changer";
import { deleteBlock } from "../features/delete-clipboard";
import { X } from "lucide-react";
import EditButton from "./color-box/edit-button";
import ColorName from "./color-box/color-name";
import CopyLogo from "./color-box/copy-button";

type ColorBoxParams = {
    color: ColorEntity
};

export const ColorBlock2 = ({ color: colorEntity }: ColorBoxParams) => {
    const colorHexData = colorDataToRoundData(colorEntity);

    return (
        <div
            className={`h-20 rounded-md w-full  shrink-0 relative flex flex-col   items-center justify-between   outline-1 overflow-hidden `}
        >
            <div className="w-full flex-1  bg-amber-100"
                style={{
                    backgroundColor: `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`,
                }}
            >
            </div>


            <div className="w-full h-7 flex flex-row justify-between ">

                <CopyLogo color={colorEntity} fontClass={"white"} />


                <div className="flex gap-2">

                <ColorName colorEntity={colorEntity} />

                <EditButton colorEntity={colorEntity} />

                <X size={15} onClick={() => deleteBlock(colorEntity.blockId, colorEntity.parentPaletteId)} />

                </div>
            </div>
        </div>
    );
};
