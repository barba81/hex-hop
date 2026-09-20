import type { ColorEntity } from "@/infrastructure/models/entity";
import { Check, RefreshCw, X } from "lucide-react";
import { CustomInput } from "@/components/custom/custom-input";
import { IconButton } from "@/components/custom/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { colorEntityToColor, colorEntityToRoundedEntity, hexaToRgbaNormalized, toHex8 } from "@/infrastructure/utils/color-format-changer";
import { getSmartColorName } from "../../features/get-color-name";
import { updateColorBlock } from "../../features/update-block";
import { setEditBlock } from "../../features/clipboard-store-actions";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useClipboardStore } from "@/store/clipboard-store";
import { Checkbox } from "@/components/ui/checkbox";

type ColorBlockEditParams = {
    colorEntity: ColorEntity
};

const ColorNameInput = () => {
    return (
        <InputGroup className="h-6 " >
            <InputGroupInput
                type="text"
                className="text-xs"
                placeholder="Color Name"
            />
            <InputGroupAddon align="inline-end">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            type="button"
                            variant='ghost'
                            size='icon-xs'
                        >
                            <RefreshCw />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Generate name
                    </TooltipContent>
                </Tooltip>
            </InputGroupAddon>
        </InputGroup>
    );
};

const ColorInputChannel = ({ channel = "r", ...props }) => {

    const label = channel.toUpperCase();

    return (
        <InputGroup className="h-6 w-20 ">
            <InputGroupInput
                type="text"
                placeholder={label}
                className={`text-xs transition-colors `}
                {...props}
            />
            <InputGroupAddon >
                R
            </InputGroupAddon>
        </InputGroup>
    );
};


const ColorBoxPreview = () => {
    const currentColor = useClipboardStore(x => x.validColor);

    return <Popover>
        <PopoverTrigger>
            <div className="overflow-hidden bg-checkerboard w-12 h-12 rounded-md" >
                <div
                    className=" transition-opacity w-full h-full "
                    style={{
                        backgroundColor: currentColor,
                    }}
                />
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
            <HexAlphaColorPicker
            // color={hexColor}
            // onChange={handleColorBox}
            />
        </PopoverContent>
    </Popover>

}


const ColorBlockEdit = ({ colorEntity }: ColorBlockEditParams) => {
    const [colorUpdateEntity, setColorUpdateEntity] = useState(() => ({ ...colorEntity }));

    useEffect(() => {
        setColorUpdateEntity({ ...colorEntity });
    }, [colorEntity]);

    const roundedEntity = colorEntityToRoundedEntity(colorUpdateEntity)
    const hexColor = toHex8(colorUpdateEntity);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let parsedValue: string | number | null = value;

        if (["r", "g", "b"].includes(name)) {
            const num = parseFloat(value);
            const clamped = isNaN(num) ? null : Math.min(255, Math.max(0, num)) / 255;
            parsedValue = clamped;
        } else if (name === "alpha" || name === "a") {
            const num = parseFloat(value);
            parsedValue = isNaN(num) ? null : num;
        }

        setColorUpdateEntity((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleRefreshName = async () => {
        const newName = await getSmartColorName(colorEntityToColor(colorUpdateEntity))
        setColorUpdateEntity((prev) => ({ ...prev, name: newName }));
    };

    const handleColorBox = (newColor: string) => {
        const color = hexaToRgbaNormalized(newColor);
        setColorUpdateEntity((prev) => ({ ...prev, ...color }));
    }

    const handleEdit = async () => {
        await updateColorBlock({
            ...colorEntity,
            ...colorUpdateEntity,
        }, colorEntity);

        setEditBlock(null);
    };

    return (
        <div className=' h-15 p-1 gap-1  rounded-md relative flex flex-row items-center  outline-1 overflow-hidden bg-background'>
            <ColorBoxPreview />
            <div className="flex flex-col gap-1">
                {/* row 1*/}
                <div className="flex-1 flex  justify-end items-top gap-1">
                    <ColorInputChannel />
                    <ColorInputChannel channel="g" />
                    <ColorInputChannel channel="a" />
                    <Button variant='destructive' size='icon-xs' onClick={() => setEditBlock(null)}> <X /></Button>
                </div>

                {/* row 2  */}

                <div className="flex items-center justify-end gap-1 ">
                    <ColorNameInput/>
                    <ColorInputChannel channel="b" />
                    <Button onClick={handleEdit}  size='icon-xs' className='bg-green-900'>
                        <Check />
                    </Button>
                </div>
            </div>
        </div>);
}

export default ColorBlockEdit;

