import type { GradientEntitySummary } from "@/features/palette-generator-page/types/entity";
import { toGradientSummary, type GradientEntity } from "@/features/palette-generator-page/types/entity";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useAppStore } from "@/shared/store/app-store";

type GradientBlockEditParams = {
    gradientEntity: GradientEntity
};

const GradientBlockEdit = ({ gradientEntity }: GradientBlockEditParams) => {
    const setEditBlock = useAppStore((state) => state.setEditBlock);
    const [gradientUpdate, setColorUpdateEntity] = useState<GradientEntitySummary>(() => (toGradientSummary(gradientEntity)));
    const handleEdit = async () => {
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
            <Input
                type="text"
                onChange={(e) => handleChange(e)}
                name="name"
                value={gradientUpdate.name}
                placeholder="Gradient name"
                className={`text-xs transition-colors `}
            />

            <Button onClick={() => handleEdit()} size='icon-sm' >
                <Check />
            </Button>
            <Button onClick={() => setEditBlock(null)} size='icon-sm' variant='destructive'>
                <X />
            </Button>
        </div>);
}

export default GradientBlockEdit;