import { DragDots } from "@/components/common/drag-dots"
import { defaultInputColor } from "../../store/clipboard-store";

const ColorBlockPreview = () => {
    const backgroundCss = defaultInputColor;

    return <div className="px-3">
        <div className={` h-10 rounded-md w-full  shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
            <div className={`flex items-center justify-center shrink-0 cursor-pointer`}>
                <DragDots />
            </div>
            <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>
                <div className={` w-9  bg-checkerboard`}>
                    <div className="w-full h-full" style={{
                        backgroundColor: backgroundCss
                    }} />
                </div>
                <div className="p-0.5 flex-1 flex flex-row justify-between pr-2">
                    <div className="flex">
                        {/* <CopyLogo color={colorEntity} fontClass={"white"} />  */}
                        {/* <CopyLogo color={colorEntity} fontClass={"white"} />  */}
                    </div>
                    <div className="flex gap-2 h-full items-center  text-sm">
                        Color Block Preview
                    </div>
                </div>

            </div>
        </div>
    </div>

}

export const SettingsColorBlock = () => {
    return <>
        <ColorBlockPreview />
    </>
}