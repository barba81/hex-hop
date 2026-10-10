import { toPaletteSummary, type PaletteEntity } from "@/features/block-list/types/entity";
import { Check, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useAppStore } from "@/shared/store/app-store";

type PaletteBlockEditParams = {
    paletteEntity: PaletteEntity
};
const PaletteBlockEdit = ({ paletteEntity }: PaletteBlockEditParams) => {
    const setEditBlock = useAppStore((store) => store.setEditBlock);
    const [paletteUpdateEntity, setColorUpdateEntity] = useState(() => (toPaletteSummary(paletteEntity)));
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
            <Input className="h-8 w-auto "
                type="text"
                name="name"
                onChange={(e) => handleChange(e)}
                value={paletteUpdateEntity.name}
                placeholder="Palette name"
            />

            <Button onClick={() => handleEdit()} size='icon-sm' >
                <Check />
            </Button>
            <Button onClick={() => setEditBlock(null)} size='icon-sm' variant='destructive'>
                <X />
            </Button>
        </div>);
}

export default PaletteBlockEdit;