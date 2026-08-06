import { DragDots } from "@/components/common/drag-dots";
import { ColorEntity } from "@/infrastructure/entity";
import { colorDataToRoundData } from "../features/color-format-changer";
import CopyLogo from "./copy-button";

type ColorBoxParams = {
    colorEntity: ColorEntity
};

const ColorBlock = ({ colorEntity: colorEntity }: ColorBoxParams) => {
    const colorHexData = colorDataToRoundData(colorEntity);

    return (
        <div
            className="h-17 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden"
        >
            <div className="flex items-center justify-center  shrink-0">
                <DragDots />
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
                <div
                    className="w-full flex-1  "
                    style={{
                        backgroundColor: `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`,
                    }}
                />

                <div className="w-full h-7 flex flex-row justify-between pr-2">
                    <div className="flex">
                        <CopyLogo color={colorEntity} fontClass={"white"} />
                    </div>
                    <div className="flex gap-2 h-full items-center font-mono text-md" >
                        {colorEntity.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorBlock;
