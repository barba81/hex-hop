import type { ColorEntity } from "@/infrastructure/models/entity";
import { colorEntityToColor, colorEntityToRoundedEntity, hexaToRgbaNormalized, toHex8 } from "../../../infrastructure/utils/color-format-changer";
import { Check, RefreshCw, X } from "lucide-react";
import { useClipboardStore } from "@/pages/color-clipboard/store/clipboard-store";
import { updateColorBlock } from "../features/update-block";
import { CustomInput } from "@/components/common/custom-input";
import { defaultButtonBackground } from "@/components/common/custom-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";
import type { ChangeEvent} from "react";
import { useEffect, useState } from "react";
import { getSmartColorName } from "../features/get-color-name";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ColorBlockEditParams = {
    colorEntity: ColorEntity
};

const ColorBlockEdit = ({ colorEntity }: ColorBlockEditParams) => {
    const setEditBox = useClipboardStore(state => state.setEditBlock);
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

        setEditBox(null);
    };

    return (<div className=' h-18  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden '>
        <div className={`w-full flex  justify-between overflow-hidden bg-background p  `}>
            <Popover>
                <PopoverTrigger asChild>
                    <div className={`w-22 bg-checkerboard cursor-pointer`}>
                        <div className="w-full h-full" style={{
                            backgroundColor: hexColor
                        }} />
                    </div>

                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                    <HexAlphaColorPicker
                        color={hexColor}
                        onChange={handleColorBox}
                    />
                </PopoverContent>
            </Popover>

            <div className="p-2.5 flex gap-2.5 items-stretch w-full">

                <div className="flex-1 flex flex-col justify-between gap-2 min-w-0 relative">

                    {/* Row 1: RGBA Inputs in a tight 4-col grid */}
                    <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                        <div className="flex gap-1 w-[90%]">
                            {[
                                { key: 'r', label: 'R', val: roundedEntity.r, color: 'text-red-500' },
                                { key: 'g', label: 'G', val: roundedEntity.g, color: 'text-green-500' },
                                { key: 'b', label: 'B', val: roundedEntity.b, color: 'text-blue-500' },
                                { key: 'alpha', label: 'A', val: roundedEntity.alpha ?? "", color: 'text-muted-foreground/40' },
                            ].map(channel => (
                                <div
                                    key={channel.key}
                                    className={`relative flex items-center ${channel.key === 'a' ? 'flex-[1.25]' : 'flex-1'
                                        }`}
                                >
                                    <span className={`absolute left-1.5 text-[10px] font-bold select-none pointer-events-none ${channel.color}`}>
                                        {channel.label}
                                    </span>
                                    <CustomInput
                                        name={channel.key}
                                        onChange={(e) => handleChange(e)}
                                        type="number"
                                        value={channel.val}
                                        className="w-full pl-4 pr-1 py-1 text-right font-mono bg-muted/60 border border-input/60 rounded focus:border-ring focus:bg-background focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Row 2: Name Input with Auto-gen Button + Save Checkmark */}
                    <div className="flex items-center justify-start gap-1.5 ">
                        <div className="flex-1 " >
                            <div className="flex-1">
                                <div className="relative flex items-center w-full">
                                    <CustomInput
                                        type="text"
                                        name="name"
                                        onChange={handleChange}

                                        value={colorUpdateEntity.name}
                                        className="w-full pr-8"
                                        placeholder="Color Name"
                                    />
                                    <div className="absolute right-1.5 flex items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    onClick={handleRefreshName}
                                                    className="p-1  text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted-foreground/20 transition-colors cursor-pointer flex items-center justify-center"
                                                >
                                                    <RefreshCw className="size-3" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Generate name
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleEdit}
                            className={`h-6 w-6 ${defaultButtonBackground} outline-1`}
                        >
                            <Check className="size-3.5" />
                        </button>
                    </div>
                    <button className={`absolute right-0 top-0 
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
            </div>
        </div>
    </div>);
}

export default ColorBlockEdit;