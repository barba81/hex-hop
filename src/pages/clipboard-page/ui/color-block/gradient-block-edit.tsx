import type { GradientEntitySummary } from "@/infrastructure/models/entity";
import { toGradientSummary, type GradientEntity } from "@/infrastructure/models/entity";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { CustomInput } from "@/components/custom/custom-input";
import { IconButton } from "@/components/custom/icon-button";
import { updateGradientBlock } from "../../features/update-block";
import { setEditBlock } from "../../features/clipboard-store-actions";

type GradientBlockEditParams = {
    gradientEntity: GradientEntity
};

const GradientBlockEdit = ({ gradientEntity }: GradientBlockEditParams) => {
    const [gradientUpdate, setColorUpdateEntity] = useState<GradientEntitySummary>(() => (toGradientSummary(gradientEntity)));
    const handleEdit = async () => {
        updateGradientBlock(gradientUpdate, toGradientSummary(gradientEntity));
        setEditBlock(null);
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
                <CustomInput type="text"
                    name="name"
                    onChange={handleChange}
                    value={gradientUpdate.name}
                    className="w-50 pr-8"
                    placeholder="Palette name" />
                <IconButton onClick={handleEdit} >
                    <Check />
                </IconButton>
                <IconButton onClick={() => setEditBlock(null)} >
                    <X />
                </IconButton>
            </div>
        </div>
    </div>);
}

export default GradientBlockEdit;