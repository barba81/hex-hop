import type { ColorEntity } from "@/infrastructure/models/entity";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { deleteBlock } from "../features/delete-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { duplicateBlock } from "../features/duplicate-block";
import ColorBlockEdit from "./color-block-edit";
import ColorBlockView from "./color-block-view";

type ColorBoxParams = {
    colorEntity: ColorEntity
    edit: boolean,
};

const ColorBlock = ({ colorEntity: colorEntity, edit }: ColorBoxParams) => {

    const setEditBox = useClipboardStore(x => x.setEditBlock);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {edit ? <ColorBlockEdit colorEntity={colorEntity} /> : <ColorBlockView colorEntity={colorEntity} />}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-20">
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
