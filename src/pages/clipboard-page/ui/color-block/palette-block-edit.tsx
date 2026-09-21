import { toPaletteSummary, type PaletteEntity } from "@/infrastructure/models/entity";
import { Check, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { setEditBlock } from "../../features/clipboard-store-actions";
import { updatePaletteBlock } from "../../features/update-block";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

type PaletteBlockEditParams = {
    paletteEntity: PaletteEntity
};
const PaletteBlockEdit = ({ paletteEntity }: PaletteBlockEditParams) => {
    const [paletteUpdateEntity, setColorUpdateEntity] = useState(() => (toPaletteSummary(paletteEntity)));
    const handleEdit = async () => {
        updatePaletteBlock(paletteUpdateEntity, toPaletteSummary(paletteEntity));
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
                    value={paletteUpdateEntity.name}
                    placeholder="Palette name"
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

export default PaletteBlockEdit;