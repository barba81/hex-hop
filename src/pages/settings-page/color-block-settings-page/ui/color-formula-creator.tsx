import { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { useClipboardStore } from "@/store/clipboard-store";
import { BlendIcon, Edit2, FormInput, Trash2 } from "lucide-react";
import { deleteColorCopyBlock } from "../feature/store-actions/color-settings-store-actions";

const ColorFormulaTitle = ({ copyFormula }: { copyFormula: ColorCopyFormula }) => {

    return (
        <div className="w-full flex  h-7  border-b-2 border-black items-center justify-between px-2 bg-background">
            <div className="flex items-center gap-2">
                {copyFormula.formulaName}
            </div>
            <div className="flex gap-2">
                <Edit2 size={18} />
                <Trash2 size={18}  onClick={()=> deleteColorCopyBlock(copyFormula.id) }/>
            </div>
        </div>
    );
};

const ColorFormulaInputList = () => {
    return (
        <div className=" h-full w-[30%] border-l-2 border-black bg-stone-900">
            <div>
                RGB
            </div>
            <div>
                HSL
            </div>
            <div>
                OAKLAB
            </div>
        </div>
    );
};



const ColorFormulaTester = () => {

}

const ColorFormula = ({ copyFormula }: { copyFormula: ColorCopyFormula }) => {
    return (
        <div className=" h-full w-[70%]">
            <div className=" w-full h-[80%] bg-stone-800">{copyFormula.formula}</div>
            <div className=" w-full h-[20%] bg-stone-900 border-t-2 border-black">
                <div className="w-5 h-5">   
                </div>
            </div>
        </div>
    );
};

const EmpytColorFormula = () => {
    return  <div className="flex flex-col flex-1 items-center justify-center  rounded-md overflow-hidden border border-black">
        <FormInput size={50} />
        <div>
            Select one color formula
        </div>
    </div>
}

export const ColorFormulaCreator = () => {
    const copyBlock = useClipboardStore((state) => state.copyList.find(x => x.id === state.colorCopyFormulaActiveId));

    return (
        <>
            {copyBlock == undefined && <EmpytColorFormula/>}
            {copyBlock !== undefined &&
                <div className="flex flex-col flex-1  rounded-md overflow-hidden border border-black">
                    <ColorFormulaTitle copyFormula={copyBlock} />
                    <div className="flex flex-1 min-h-0">
                        <ColorFormula copyFormula={copyBlock} />
                        <ColorFormulaInputList />
                    </div>
                </div>
            }
        </>
    );
};