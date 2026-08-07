import { DragDots } from "@/components/common/drag-dots";
import { ColorEntity } from "@/infrastructure/models/entity";
import { colorDataToRoundData } from "../../../infrastructure/utils/color-format-changer";
import CopyLogo from "./copy-button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { deleteBlock } from "../features/delete-block";

type ColorBoxParams = {
    colorEntity: ColorEntity
};

const ColorBlock = ({ colorEntity: colorEntity }: ColorBoxParams) => {

    const colorHexData = colorDataToRoundData(colorEntity);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="h-15 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden "
                >
                    <div className="flex items-center justify-center  shrink-0">
                        <DragDots />
                    </div>

                    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
                        <div
                            className="w-full flex-1  "
                            style={{
                                backgroundColor: `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`,
                            }}
                        />

                        <div className="w-full h-7 flex flex-row justify-between pr-2">
                            <div className="flex">
                                <CopyLogo color={colorEntity} fontClass={"white"} />
                            </div>
                            <div className="flex gap-2 h-full items-center font-mono text-md" >
                                {colorEntity.name}
                            </div>
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem className="gap-2">
                    <Pen className="size-4" />
                    Edit
                </ContextMenuItem>

                <ContextMenuItem className="gap-2">
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
