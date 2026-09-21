import { DragDots } from "@/components/custom/drag-and-drop/drag-dots"
import { defaultInputColor, useClipboardStore } from "../../../../store/clipboard-store";
import type { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { useSortable } from '@dnd-kit/react/sortable';
import { ChevronDown, ChevronUp, Eye, EyeClosed, Plus } from "lucide-react";
import { ColorFormulaCreator } from "./color-formula-creator";
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { DynamicIconMapper } from "@/infrastructure/utils/icon-mapper";
import { addNewColorCopyBlock, flipColorCopyBlockVisibility, setColorCopyFormulaActive } from "../feature/color-settings-store-actions";
import { Button } from "@/components/ui/button";



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

export const ColorFormatBlock = ({ copyBlock, index }: { copyBlock: ColorCopyFormula, index: number }) => {
    const { ref } = useSortable({ id: copyBlock.id, index: index, modifiers: [RestrictToVerticalAxis], });
    const colorCopyFormulaActiveId = useClipboardStore((state) => state.colorCopyFormulaActiveId);

    return <div onClick={() => setColorCopyFormulaActive(copyBlock.id)} ref={ref}


        className={` h-7 rounded-md w-full   shrink-0 relative flex flex-row items-stretch outline-2  overflow-hidden ${!copyBlock.enabled && "opacity-50"} 
         ${colorCopyFormulaActiveId === copyBlock.id && 'outline-2 outline-primary'}`}>
        <div className={`flex items-center justify-center shrink-0 cursor-pointer`}>
            <DragDots />
        </div>
        <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>

            <div className=" flex-1 flex flex-row justify-between px-1">
                <div className="flex w-4 items-center gap-1 ">
                    {copyBlock.iconId !== null && copyBlock.iconId !== undefined && (
                        <DynamicIconMapper iconId={copyBlock.iconId} />
                    )}
                    {copyBlock.formulaName}
                </div>
                <div className="flex gap-2 h-full items-center  text-sm">
                    {copyBlock.formula}
                </div>

                <div className="flex items-center justify-center gap-1">
                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary p-0.5 "
                        onClick={() => flipColorCopyBlockVisibility(copyBlock.id)}>
                        {copyBlock.enabled ? <Eye size={18} /> :
                            <EyeClosed size={18} />
                        }
                    </div>

                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary" onClick={() => { }}><ChevronUp size={20} /></div>
                    <div className="cursor-pointer border rounded-md hover:border-primary hover:bg-secondary" onClick={() => { }}><ChevronDown size={20} /></div>
                </div>
            </div>

        </div>
    </div>
}

const ColorFormatHeader = () => {

    return <div className="p-1 flex w-full justify-between items-center border-b-3 ">
        <div className="text-sm">
            Color format formulas
        </div>
        <Button variant='outline' size='icon-sm'  onClick={async () => addNewColorCopyBlock()}>
            <Plus  />
        </Button>


    </div>
}

export const ColorFormat = () => {
    const copyList = useClipboardStore((state) => state.copyList);
    return <div className=" px-1   bg-accent   rounded-md">
        <ColorFormatHeader />
        <div className="flex flex-col gap-1.5 pt-2 overflow-x-scroll h-40 px-1">
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

