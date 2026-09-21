import type { GradientEntity } from "@/infrastructure/models/entity";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";
import { setEditBlock } from "@/pages/clipboard-page/features/clipboard-store-actions";
import { deleteGradientBlock } from "@/pages/clipboard-page/features/delete-block";
import { BaseOutlineBlock } from "../base-outline-block";

type GradientBoxParams = {
    gradientEntity: GradientEntity 
};

export const GradientBlockSmall = ({ gradientEntity: gradientEntity }: GradientBoxParams) => {

    const gradientBackground = gradientToCssString(gradientEntity);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <BaseOutlineBlock block={gradientEntity}>
                    <div className="w-full flex justify-between overflow-hidden bg-background">
                        <div className="w-9 bg-checkerboard">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: gradientBackground,
                                }}
                            />
                        </div>

                        <div className="p-0.5 flex-1 flex flex-row justify-between pr-2">
                            <div className="flex" />

                            <div className="flex gap-2 h-full items-center">
                                {gradientEntity.name}
                            </div>
                        </div>
                    </div>
                </BaseOutlineBlock>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem className="gap-2" onClick={() => setEditBlock(gradientEntity.blockId)}>
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
                    onClick={() => deleteGradientBlock(gradientEntity.blockId, gradientEntity.id, gradientEntity.parentPaletteId)}
                >
                    <Trash2 className="size-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default GradientBlockSmall;