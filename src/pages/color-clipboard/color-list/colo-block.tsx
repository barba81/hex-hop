import { DragDots } from "@/components/common/drag-dots";
import { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground as coloBackgroundCss, colorDataToRoundData } from "../../../infrastructure/utils/color-format-changer";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Check, Copy, Pen, RefreshCw, Trash2, X } from "lucide-react";
import { deleteBlock } from "../features/delete-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import PreviewColorBox from "../footer-color-picker/preview-color-box";
import { duplicateBlock } from "../features/duplicate-block";
import { updateColorBlock } from "../features/update-block";
import { MicroInput } from "@/components/common/micro-input";
import { defaultButtonBackground, MicroButton } from "@/components/common/micro-button";

type ColorBoxParams = {
    colorEntity: ColorEntity
    edit: boolean,
};

const ColorBlockMain = ({ colorEntity, edit }: ColorBoxParams) => {
    const colorHexData = colorDataToRoundData(colorEntity);
    const backgroundCss = coloBackgroundCss(colorEntity);
    const setEditBox = useClipboardStore(x => x.setEditBlock);

    const handleEdit = () => {
        setEditBox(null);
        updateColorBlock(colorEntity);
    }

    const handleRefreshName = () => {
        // Handle auto-generating color name here
    };

    return (<div className={` ${edit ? 'h-20' : 'h-15'}  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
        <div className={`flex items-center justify-center shrink-0 ${edit && 'hidden'}`}>
            <DragDots />
        </div>
        <div className={`w-full flex ${!edit && 'flex-col'} justify-between overflow-hidden bg-background  `}>
            <div className={`${edit ? 'w-6' : 'flex-1'} bg-checkerboard`}>
                <div className="w-full h-full" style={{
                    backgroundColor: backgroundCss
                }} />
            </div>
            {!edit && <div className="p-0.5 flex flex-row justify-between pr-2">
                <div className="flex">
                    {
                        /* <CopyLogo color={colorEntity} fontClass={"white"} /> */
                    }
                </div>
                <div className="flex gap-2 h-full items-center ">
                    {colorEntity.name}
                </div>
            </div>}
            {edit &&
                /* --- EDIT MODE --- */
                <div className="p-2.5 flex gap-2.5 items-stretch w-full">

                    {/* Right: Controls Stack */}
                    <div className="flex-1 flex flex-col justify-between gap-2 min-w-0 relative">

                        <button className={`absolute -right-1 -top-1 
                            flex items-center justify-center
                            bg-red-100
                            hover:bg-red-200
                            dark:bg-foreground/10
                            dark:hover:bg-red-800
                            rounded-full 
                            cursor-pointer  w-6 h-6  `} 
                            onClick={() => setEditBox(null)} >
                            <X size={16} />
                        </button>

                        {/* Row 1: RGBA Inputs in a tight 4-col grid */}
                        <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                            {/* Row 1: RGBA Inputs in a tight 4-col grid */}
                            <div className="flex gap-1">
                                {[
                                    { key: 'r', label: 'R', val: colorHexData.r, color: 'text-red-500' },
                                    { key: 'g', label: 'G', val: colorHexData.g, color: 'text-green-500' },
                                    { key: 'b', label: 'B', val: colorHexData.b, color: 'text-blue-500' },
                                    { key: 'a', label: 'A', val: colorHexData.alpha, color: 'text-muted-foreground/40' },
                                ].map(channel => (
                                    <div key={channel.key} className="relative flex items-center">
                                        <span className={`absolute left-1.5 text-[10px] font-bold select-none pointer-events-none ${channel.color}`}>
                                            {channel.label}
                                        </span>
                                        <MicroInput
                                            type="number"

                                            defaultValue={channel.val}
                                            className="w-15 pl-4 pr-1 py-1  text-right font-mono bg-muted/60 border border-input/60 rounded focus:border-ring focus:bg-background focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Row 2: Name Input with Auto-gen Button + Save Checkmark */}
                        <div className="flex items-center justify-end gap-1.5">
                            <PreviewColorBox />
                            <div>

                                <div className="relative flex-1 flex items-center">
                                    <MicroInput
                                        type="text"
                                        defaultValue={colorEntity.name}
                                        className="w-40"
                                        placeholder="Color Name"
                                    />
                                    <button

                                        type="button"
                                        title="Auto-generate name"
                                        onClick={handleRefreshName}
                                        className="absolute right-1 p-1 text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted transition-colors hover:cursor-pointer"
                                    >
                                        <RefreshCw className="size-3" />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleEdit}
                                className={`h-7 w-7 ${defaultButtonBackground} `}
                            >
                                <Check className="size-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

            }
        </div>
    </div>);
}


const ColorBlock = ({ colorEntity: colorEntity, edit }: ColorBoxParams) => {

    const setEditBox = useClipboardStore(x => x.setEditBlock);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ColorBlockMain edit={edit} colorEntity={colorEntity} />
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem className="gap-2" onClick={() => setEditBox(colorEntity.blockId)}>
                    <Pen className="size-4" />
                    Edit
                </ContextMenuItem>

                <ContextMenuItem className="gap-2"
                    onClick={() => duplicateBlock(colorEntity)}>
                    <Copy className="size-4" />
                    Copy
                </ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuItem
                    variant="destructive"
                    className="gap-2"
                    onClick={() => deleteBlock(colorEntity.blockId, colorEntity.parentPaletteId)}
                >
                    <Trash2 className="size-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default ColorBlock;
