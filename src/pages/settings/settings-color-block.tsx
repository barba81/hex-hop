import { DragDots } from "@/components/common/drag-dots"
import { defaultInputColor, useClipboardStore } from "../../store/clipboard-store";
import { ColorCopyList } from "@/infrastructure/models/color-copy-list";
import { useSortable } from '@dnd-kit/react/sortable';
import ColorBlock from "../color-clipboard/color-block/color-block-small-boxes";

const ColorBlockPreview = () => {
    const backgroundCss = defaultInputColor;

    return <div className="px-1">
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
                    </div>
                    <div className="flex gap-2 h-full items-center  text-sm">
                        Color Block Preview
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export const ColorFormatBlock = ({ copyBlock, index }: { copyBlock: ColorCopyList, index: number }) => {
    const { ref } = useSortable({ id: copyBlock.id, index: index });
    const setColorCopyFormulaActive = useClipboardStore((state) => state.setColorCopyFormulaActive);
    const colorCopyFormulaActiveId = useClipboardStore((state) => state.colorCopyFormulaActiveId);

    return <div onClick={() => setColorCopyFormulaActive(copyBlock.id)} ref={ref}


        className={` h-7 rounded-md w-full  shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden
         ${colorCopyFormulaActiveId === copyBlock.id && 'outline-2 outline-primary'}`}>
        <div className={`flex items-center justify-center shrink-0 cursor-pointer`}>
            <DragDots />
        </div>
        <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>

            <div className=" flex-1 flex flex-row justify-between pr-2">
                <div className="flex">
                </div>
                <div className="flex gap-2 h-full items-center  text-sm">

                </div>
                <div className="flex">
                <div>V</div>
                <div>A</div>
                </div>
            </div>

        </div>
    </div>
}

export const ColorFormat = () => {
    const copyList = useClipboardStore((state) => state.copyList);
    return <div className="flex flex-col gap-2 px-1 max-h-40 overflow-x-scroll bg-accent p-2 rounded-md">
        {copyList.map((copyBlock, index) => {
            return <ColorFormatBlock key={copyBlock.id} copyBlock={copyBlock} index={index} />
        })}
    </div>
}

export const SettingsColorBlock = () => {

    return <>
        <div className="flex flex-col gap-1">

            <ColorBlockPreview />
            <ColorFormat />
        </div>
    </>
}