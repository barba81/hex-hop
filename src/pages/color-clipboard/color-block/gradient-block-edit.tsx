import { GradientEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "../store/use-clipboard-store";
import { ChangeEvent, useState } from "react";
import { Check, X } from "lucide-react";
import { MicroInput } from "@/components/common/micro-input";
import { defaultButtonBackground } from "@/components/common/micro-button";
import { updateGradientBlock, updatePaletteBlock } from "../features/update-block";

type GradientBlockEditParams = {
    gradientEntity: GradientEntity
};
const GradientBlockEdit = ({ gradientEntity }: GradientBlockEditParams) => {
   const setEditBox = useClipboardStore(x => x.setEditBlock);
    const [gradientUpdateEntity, setColorUpdateEntity] = useState(() => ({ ...gradientEntity }));
    const handleEdit = async () => {
        updateGradientBlock(gradientUpdateEntity , gradientEntity );
        setEditBox(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
               setColorUpdateEntity((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (<div className=' h-10  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden '>
        <div className={`w-full flex flex-col justify-between overflow-hidden bg-background p-2 `}>

            <div className="flex justify-end items-end gap-3">
                <MicroInput type="text"
                    name="name"
                    onChange={handleChange}

                    value={gradientUpdateEntity.name}
                    className="w-50 pr-8"
                    placeholder="Palette name" />
                <button
                    onClick={handleEdit}
                    className={`h-6 w-6 ${defaultButtonBackground} outline-1`}
                >
                    <Check className="size-3.5" />
                </button>
                <button onClick={() => setEditBox(null)}
                    className={`h-6 w-6 ${defaultButtonBackground} outline-1`}
                >
                    <X className="size-3.5" />
                </button>
            </div>
        </div>
    </div>);
}

export default GradientBlockEdit;