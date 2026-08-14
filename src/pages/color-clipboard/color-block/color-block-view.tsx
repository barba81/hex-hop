import { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground  } from "../../../infrastructure/utils/color-format-changer";
import { DragDots } from "@/components/common/drag-dots";
import CopyLogo from "./copy-button";

type ColorBlockViewParams = {
    colorEntity: ColorEntity
};

const ColorBlockView = ({ colorEntity }: ColorBlockViewParams) => {
    const backgroundCss = coloBackground(colorEntity);
    
    return <div className={` h-15 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
        <div className={`flex items-center justify-center shrink-0 `}>
            <DragDots />
        </div>
        <div className={`w-full flex flex-col justify-between overflow-hidden bg-background  `}>
            <div className={`flex-1 bg-checkerboard`}>
                <div className="w-full h-full" style={{
                    backgroundColor: backgroundCss
                }} />
            </div>
            <div className="p-0.5 flex flex-row justify-between pr-2">
                <div className="flex">
                    {/* <CopyLogo color={colorEntity} fontClass={"white"} />  */}
                </div>
                <div className="flex gap-2 h-full items-center ">
                    {colorEntity.name}
                </div>
            </div>
        </div>
    </div>
}

export default ColorBlockView;