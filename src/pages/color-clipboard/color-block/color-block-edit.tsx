import type { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground as coloBackgroundCss, colorDataToRoundData, colorEntityToRoundedEntity, colorRoundEntityToEntity } from "../../../infrastructure/utils/color-format-changer";
import { Check, RefreshCw, X } from "lucide-react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { updateColorBlock } from "../features/update-block";
import { MicroInput } from "@/components/common/micro-input";
import { defaultButtonBackground } from "@/components/common/micro-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";
import { ChangeEvent, useState } from "react";
import { getSmartColorName } from "../features/get-color-name";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ColorBlockEditParams = {
    colorEntity: ColorEntity
};

const ColorBlockEdit = ({ colorEntity }: ColorBlockEditParams) => {
    const setEditBox = useClipboardStore(x => x.setEditBlock);
    const [colorHexData, setColorHexData] = useState(colorEntityToRoundedEntity(colorEntity));
    const [backgroundCss, setBackgroundCss] = useState(coloBackgroundCss(colorEntity));

    const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const { name, value } = e.target;
        const newColor = {
            ...colorHexData,
            [name]: value
        };
        setColorHexData(newColor);
        setBackgroundCss(coloBackgroundCss(colorRoundEntityToEntity(newColor)));
    }

    const handleEdit = async () => {
        const updatedColor = colorRoundEntityToEntity(colorHexData)

        await updateColorBlock({
            ...colorEntity,
            ...updatedColor,
        });
        setEditBox(null);
    }

    const handleRefreshName = async () => {
        const updatedColor = colorRoundEntityToEntity(colorHexData)
        const newName = await getSmartColorName({ ...updatedColor, mode: 'rgb' })
        setColorHexData({ ...colorHexData, name: newName });
    };

    return (<div className=' h-18  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden '>
        <div className={`w-full flex  justify-between overflow-hidden bg-background p  `}>
            <Popover>
                <PopoverTrigger asChild>
                    <div className={`w-22 bg-checkerboard cursor-pointer`}>
                        <div className="w-full h-full" style={{
                            backgroundColor: backgroundCss
                        }} />
                    </div>

                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                    <HexAlphaColorPicker
                    //   color={currentColor}
                    //   onChange={handleOnChange}
                    />
                </PopoverContent>
            </Popover>

            <div className="p-2.5 flex gap-2.5 items-stretch w-full">

                <div className="flex-1 flex flex-col justify-between gap-2 min-w-0 relative">

                    {/* Row 1: RGBA Inputs in a tight 4-col grid */}
                    <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                        <div className="flex gap-1 w-[90%]">
                            {[
                                { key: 'r', label: 'R', val: colorHexData.r, color: 'text-red-500' },
                                { key: 'g', label: 'G', val: colorHexData.g, color: 'text-green-500' },
                                { key: 'b', label: 'B', val: colorHexData.b, color: 'text-blue-500' },
                                { key: 'a', label: 'A', val: colorHexData.alpha, color: 'text-muted-foreground/40' },
                            ].map(channel => (
                                <div
                                    key={channel.key}
                                    className={`relative flex items-center ${channel.key === 'a' ? 'flex-[1.25]' : 'flex-1'
                                        }`}
                                >
                                    <span className={`absolute left-1.5 text-[10px] font-bold select-none pointer-events-none ${channel.color}`}>
                                        {channel.label}
                                    </span>
                                    <MicroInput
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
                                    <MicroInput
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={colorHexData.name}
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