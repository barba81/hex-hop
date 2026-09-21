import type { GradientEntitySummary } from "@/infrastructure/models/entity";
import { toGradientSummary, type GradientEntity } from "@/infrastructure/models/entity";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { updateGradientBlock } from "../../features/update-block";
import { setEditBlock } from "../../features/clipboard-store-actions";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

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

    return (
     <div className=' h-10 p-1 outline-1 gap-1 flex items-center justify-end bg-background rounded-md'>
            <InputGroup className="h-8 w-auto ">
                <InputGroupInput
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={gradientUpdate.name}
                    placeholder="Gradient name"
                    className={`text-xs transition-colors `}
                />
            </InputGroup>

            <Button onClick={() => handleEdit()} size='icon-sm' >
                <Check  />
            </Button>
            <Button onClick={() => setEditBlock(null)} size='icon-sm' variant='destructive'>
                <X  />
            </Button>
        </div>);
}

export default GradientBlockEdit;