import { DragDots } from "@/components/common/drag-dots";
import type { GradientEntity } from "@/infrastructure/models/entity";
import { gradientToCssString } from "../../../infrastructure/utils/gradient-to-css-string";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { deleteGradientBlock } from "../features/delete-block";

type GradientBoxParams = {
    gradientEntity: GradientEntity
};

export const GradientBlock = ({ gradientEntity: gradientEntity }: GradientBoxParams) => {
    const gradientBackground = gradientToCssString(gradientEntity);
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="h-17 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-2 overflow-hidden"
                >
                    <div className="flex items-center justify-center  shrink-0">
                        <DragDots />
                    </div>

                    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
                        <div
                            className="w-full h-5 flex-1"
                            style={{
                                backgroundImage: gradientBackground,
                            }}
                        />

                        <div className="w-full h-7 flex flex-row justify-between pr-2">
                            <div className="flex">
                            </div>
                            <div className="flex gap-2 h-full items-center font-mono text-md">
                                {gradientEntity.name}
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
                    onClick={() => deleteGradientBlock(gradientEntity.blockId, gradientEntity.id,  gradientEntity.parentPaletteId)}
                >
                    <Trash2 className="size-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default GradientBlock;