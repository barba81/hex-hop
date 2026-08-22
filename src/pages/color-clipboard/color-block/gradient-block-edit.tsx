import { GradientEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "../store/use-clipboard-store";
import { ChangeEvent, useState } from "react";
import { Check, X } from "lucide-react";
import { MicroInput } from "@/components/common/micro-input";
import { defaultButtonBackground } from "@/components/common/micro-button";

type GradientBlockEditParams = {
    gradientEntity: GradientEntity
};
const GradientBlockEdit = ({ gradientEntity }: GradientBlockEditParams) => {
 const setEditBox = useClipboardStore(x => x.setEditBlock);
    const [colorUpdateEntity, setColorUpdateEntity] = useState(() => ({ name: gradientEntity.name }));
    const handleEdit = async () => {
        setEditBox(null);
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setColorUpdateEntity({ name: value });
    };

    return (<div className=' h-18  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden '>
        <div className={`w-full flex flex-col justify-between overflow-hidden bg-background p-2 `}>
            <div className="flex w-full justify-end items-center">
                <button className={`
                            w-5
                            flex items-center justify-center
                            hover:bg-red-200
                            dark:bg-foreground/10
                            dark:hover:bg-destructive/50
                            rounded-full 
                            p-0.5
                            cursor-pointer   `}
                    onClick={() => setEditBox(null)} >
                    <X size={13} />
                </button>
            </div>
            <div className="flex justify-end items-end gap-3">
                <MicroInput type="text"
                    name="name"
                    onChange={handleChange}

                    value={colorUpdateEntity.name}
                    className="w-50 pr-8"
                    placeholder="Palette name" />
                <button
                    onClick={handleEdit}
                    className={`h-6 w-6 ${defaultButtonBackground} outline-1`}
                >
                    <Check className="size-3.5" />
                </button>
            </div>
        </div>
    </div>);
}

export default GradientBlockEdit;