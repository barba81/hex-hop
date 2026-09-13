import { DragDots } from "@/components/common/drag-dots"
import { defaultInputColor, useClipboardStore } from "../../store/clipboard-store";
import { ColorCopyList } from "@/infrastructure/models/color-copy-list";
import { useSortable } from '@dnd-kit/react/sortable';
import ColorBlock from "../color-clipboard/color-block/color-block-small-boxes";
import { ChevronDown, ChevronUp, EllipsisVertical, Eye, EyeClosed, Plus, SquareChevronDown, SquareChevronUp } from "lucide-react";
import { ColorFormulaCreator } from "./color-formula-creator";
import { CustomButton, defaultButtonBackground } from "@/components/common/custom-button";

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
    const flitColorCopyBloc = useClipboardStore((state) => state.flitColorCopyBloc);
    const Icon = copyBlock.icon;

    return <div onClick={() => setColorCopyFormulaActive(copyBlock.id)} ref={ref}


        className={` h-7 rounded-md w-full  shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden
         ${colorCopyFormulaActiveId === copyBlock.id && 'outline-2 outline-primary'}`}>
        <div className={`flex items-center justify-center shrink-0 cursor-pointer`}>
            <DragDots />
        </div>
        <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>

            <div className=" flex-1 flex flex-row justify-between px-1">
                <div className="flex w-4 items-center gap-1 ">
                    <Icon />
                    {copyBlock.fallBackName}
                </div>
                <div className="flex gap-2 h-full items-center  text-sm">
                    {copyBlock.formula}
                </div>

                <div className="flex items-center justify-center gap-1">
                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary p-0.5 " 
                    onClick={()=> flitColorCopyBloc(copyBlock.id)}> 
                    {copyBlock.enabled ? <Eye size={18} /> :
                        <EyeClosed size={18} />
                    }
                    </div>

                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary" onClick={() => { }}><ChevronUp size={20} /></div>
                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary" onClick={() => { }}><ChevronDown size={20} /></div>
                    <EllipsisVertical size={18} />
                </div>
            </div>

        </div>
    </div>
}

const ColorFormatHeader = () => {
    return <div className="py-1 flex w-full justify-end ">

        <button
            className={`         
                ${defaultButtonBackground}
             w-6 h-6 overflow-hidden outline-1 `}
            onClick={async () => {
                // await addNewColorToClipboard(inputColor, null);
            }}
        >
            <Plus size={20} />
        </button>


    </div>
}

export const ColorFormat = () => {
    const copyList = useClipboardStore((state) => state.copyList);
    return <div className=" px-1 h-40 overflow-x-scroll bg-accent p-1  rounded-md">
        <ColorFormatHeader />
        <div className="flex flex-col gap-2 ">
            {copyList.map((copyBlock, index) => {
                return <ColorFormatBlock key={copyBlock.id} copyBlock={copyBlock} index={index} />
            })}
        </div>
    </div>
}

export const SettingsColorBlock = () => {

    return <div className="h-full flex flex-col gap-1 overflow-auto p-1 ">
        <ColorBlockPreview />
        <ColorFormat />
        <ColorFormulaCreator />
    </div>
}

