import type { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground as coloBackgroundCss, colorDataToRoundData } from "../../../infrastructure/utils/color-format-changer";
import { Check, RefreshCw, X } from "lucide-react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { updateColorBlock } from "../features/update-block";
import { MicroInput } from "@/components/common/micro-input";
import { defaultButtonBackground } from "@/components/common/micro-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";


type ColorBlockEditParams = {
    colorEntity: ColorEntity
};

const ColorPopover = ({ backgroundCss }: { backgroundCss: string }) => {
    return <Popover>
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
}


const ColorBlockEdit = ({ colorEntity }: ColorBlockEditParams) => {
    const setEditBox = useClipboardStore(x => x.setEditBlock);
    const colorHexData = colorDataToRoundData(colorEntity);
    const backgroundCss = coloBackgroundCss(colorEntity);

    const handleEdit = () => {
        setEditBox(null);
        updateColorBlock(colorEntity);
    }

    const handleRefreshName = () => {
        // Handle auto-generating color name here
    };

    return (<div className=' h-18  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden '>
        <div className={`w-full flex  justify-between overflow-hidden bg-background  `}>
            <ColorPopover backgroundCss={backgroundCss} />

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
                                        type="number"
                                        defaultValue={channel.val}
                                        className="w-full pl-4 pr-1 py-1 text-right font-mono bg-muted/60 border border-input/60 rounded focus:border-ring focus:bg-background focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Row 2: Name Input with Auto-gen Button + Save Checkmark */}
                    <div className="flex items-center justify-start gap-1.5">
                        <div className="flex-1" >
                            <div className="relative  flex items-center">
                                <MicroInput
                                    type="text"
                                    defaultValue={colorEntity.name}
                                    className="w-full"
                                    placeholder="Color Name"
                                />
                                <button
                                    type="button"
                                    title="Auto-generate name"
                                    onClick={handleRefreshName}
                                    className="absolute right-1 p-1 text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted transition-colors hover:cursor-pointer "
                                >
                                    <RefreshCw className="size-3" />
                                </button>
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