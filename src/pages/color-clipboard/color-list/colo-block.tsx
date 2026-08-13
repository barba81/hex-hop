import { DragDots } from "@/components/common/drag-dots";
import { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground as coloBackgroundCss, colorDataToRoundData } from "../../../infrastructure/utils/color-format-changer";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Check, Copy, Pen, RefreshCw, Trash2 } from "lucide-react";
import { deleteBlock } from "../features/delete-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import PreviewColorBox from "../footer-color-picker/preview-color-box";
import { duplicateBlock } from "../features/duplicate-block";

type ColorBoxParams = {
    colorEntity: ColorEntity
    edit: boolean,
};



const ColorBlockMain = ({ colorEntity, edit }: ColorBoxParams) => {
    const colorHexData = colorDataToRoundData(colorEntity);
    const backgroundCss = coloBackgroundCss(colorEntity);
    return (<div className={` ${edit ? 'h-20' : 'h-15'}  rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
        <div className="flex items-center justify-center shrink-0">
            <DragDots />
        </div>
        <div className={`w-full flex ${!edit && 'flex-col'} justify-between overflow-hidden bg-background  `}>
            <div className={`${edit ? 'w-20' : 'flex-1'} bg-checkerboard`}>
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
            {edit && <div className="flex-1 flex flex-col justify-between p-2 gap-2 bg-background">
                {
                    /* Row 1: RGB Input Fields */
                }
                <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                        R
                        <input type="number" min="0" max="255" defaultValue={colorHexData.r} className="w-12 h-6 px-1 text-xs text-foreground bg-muted border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring" />
                    </label>
                    <label className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                        G
                        <input type="number" min="0" max="255" defaultValue={colorHexData.g} className="w-12 h-6 px-1 text-xs text-foreground bg-muted border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring" />
                    </label>
                    <label className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                        B
                        <input type="number" min="0" max="255" defaultValue={colorHexData.b} className="w-12 h-6 px-1 text-xs text-foreground bg-muted border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring" />
                    </label>
                </div>

                {
                    /* Row 2: Color Box, Refresh Name, Name Display, Checkbox */
                }
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <PreviewColorBox />
                        <button type="button" className="p-1 rounded hover:bg-accent transition-colors" title="Refresh Name">
                            <RefreshCw className="size-3.5 text-muted-foreground" />
                        </button>
                        <span className="text-xs font-medium text-foreground truncate max-w-[100px]">
                            {colorEntity.name}
                        </span>
                    </div>

                    <button type="button" className="p-1 rounded hover:bg-accent text-primary transition-colors" title="Save Changes">
                        <Check className="size-4" />
                    </button>
                </div>
            </div>}
        </div>
    </div>);
}


const ColorBlock = ({ colorEntity: colorEntity, edit }: ColorBoxParams) => {

    const setEditBox = useClipboardStore(x => x.setEditBlock);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ColorBlockMain edit={edit}  colorEntity={colorEntity}/>
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
